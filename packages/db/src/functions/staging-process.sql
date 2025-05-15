CREATE OR REPLACE FUNCTION staging.process_company_staging(p_data jsonb)
RETURNS jsonb
LANGUAGE plpgsql
AS $$
DECLARE
    -- Our local variables:
    v_staging_company_id   uuid;
    v_source_name          text;
    v_record_id            text;
    v_airbyte_raw_id       text;
    v_airbyte_extracted_at timestamptz;  -- can be null if missing

    v_financial  jsonb;
    v_identifier jsonb;
    v_person     jsonb;
    v_address    jsonb;
BEGIN
    --------------------------------------------------------------------------
    -- 1) Extract "sourceInfo" fields from the inbound JSON
    --------------------------------------------------------------------------
    v_source_name    := p_data->'sourceInfo'->>'sourceName';
    v_record_id      := p_data->'sourceInfo'->>'recordId';
    v_airbyte_raw_id := p_data->'sourceInfo'->>'airbyteRawId';

    -- If it's empty string or missing, parse to NULL
    v_airbyte_extracted_at := NULLIF(p_data->'sourceInfo'->>'airbyteExtractedAt','')::timestamptz;

    IF v_source_name IS NULL OR v_source_name = '' THEN
        RAISE EXCEPTION '[process_company_staging] Missing sourceName!';
    END IF;
    IF v_record_id IS NULL OR v_record_id = '' THEN
        RAISE EXCEPTION '[process_company_staging] Missing recordId!';
    END IF;

    --------------------------------------------------------------------------
    -- 2) Upsert into companies_staging using (source_name, record_id)
    --------------------------------------------------------------------------
    INSERT INTO staging.companies_staging (
        name,
        description,
        website_url,
        location,
        ticker,
        size,
        cik,
        source_name,
        record_id,
        _airbyte_raw_id,
        _airbyte_extracted_at,
        created_at,
        updated_at
    )
    VALUES (
        p_data->'company'->>'name',
        p_data->'company'->>'description',
        p_data->'company'->>'website_url',
        p_data->'company'->>'location',
        p_data->'company'->>'ticker',
        p_data->'company'->>'size',
        p_data->'company'->>'cik',
        v_source_name,
        v_record_id,
        v_airbyte_raw_id,
        v_airbyte_extracted_at,
        now(),
        now()
    )
    ON CONFLICT (source_name, record_id)
    DO UPDATE
      SET
        name                  = EXCLUDED.name,
        description           = EXCLUDED.description,
        website_url           = EXCLUDED.website_url,
        location              = EXCLUDED.location,
        ticker                = EXCLUDED.ticker,
        size                  = EXCLUDED.size,
        cik                   = EXCLUDED.cik,
        _airbyte_raw_id       = EXCLUDED._airbyte_raw_id,
        _airbyte_extracted_at = EXCLUDED._airbyte_extracted_at,
        updated_at            = now()
    RETURNING staging_id
    INTO v_staging_company_id;

    --------------------------------------------------------------------------
    -- 3) Upsert multiple addresses (array),
    --    deduplicate on (staging_company_id, address_type, city).
    --------------------------------------------------------------------------
    IF p_data ? 'addresses' AND jsonb_typeof(p_data->'addresses') = 'array' THEN
        FOR v_address IN
            SELECT * FROM jsonb_array_elements(p_data->'addresses')
        LOOP
            INSERT INTO staging.company_addresses_staging (
                staging_company_id,
                address_type,
                street_line_1,
                street_line_2,
                city,
                state_province,
                postal_code,
                country_code,
                phone,
                is_primary,
                source,
                _airbyte_source_name,
                _airbyte_extracted_at,
                _airbyte_raw_id,
                created_at,
                updated_at
            )
            VALUES (
                v_staging_company_id,
                (v_address->>'address_type')::public.address_type,
                v_address->>'street_line_1',
                v_address->>'street_line_2',
                v_address->>'city',
                v_address->>'state_province',
                v_address->>'postal_code',
                v_address->>'country_code',
                v_address->>'phone',
                CASE WHEN (v_address->>'is_primary') = 'true' THEN true
                     WHEN (v_address->>'is_primary') = 'false' THEN false
                     ELSE null
                END,
                v_source_name,
                v_source_name,
                v_airbyte_extracted_at,
                v_airbyte_raw_id,
                now(),
                now()
            )
            ON CONFLICT (staging_company_id, address_type, city)
            DO UPDATE
              SET
                street_line_1        = EXCLUDED.street_line_1,
                street_line_2        = EXCLUDED.street_line_2,
                state_province       = EXCLUDED.state_province,
                postal_code          = EXCLUDED.postal_code,
                country_code         = EXCLUDED.country_code,
                phone                = EXCLUDED.phone,
                is_primary           = EXCLUDED.is_primary,
                source               = EXCLUDED.source,
                _airbyte_source_name = EXCLUDED._airbyte_source_name,
                _airbyte_extracted_at= EXCLUDED._airbyte_extracted_at,
                _airbyte_raw_id      = EXCLUDED._airbyte_raw_id,
                updated_at           = now();
        END LOOP;
    END IF;

    --------------------------------------------------------------------------
    -- 4) Upsert financials (array), unique by (staging_company_id, as_of_date).
    --------------------------------------------------------------------------
    IF p_data ? 'financials' AND jsonb_typeof(p_data->'financials') = 'array' THEN
        FOR v_financial IN
            SELECT * FROM jsonb_array_elements(p_data->'financials')
        LOOP
            INSERT INTO staging.company_financials_staging (
                staging_company_id,
                as_of_date,
                market_cap,
                stock_price,
                beta,
                price_change_percent,
                average_volume,
                dividend_yield,
                dcf_value,
                currency,
                data_source,
                _airbyte_source_name,
                _airbyte_extracted_at,
                _airbyte_raw_id,
                created_at,
                updated_at
            )
            VALUES (
                v_staging_company_id,
                (v_financial->>'as_of_date')::timestamptz,
                NULLIF(v_financial->>'market_cap','')::numeric,
                NULLIF(v_financial->>'stock_price','')::numeric,
                NULLIF(v_financial->>'beta','')::numeric,
                NULLIF(v_financial->>'price_change_percent','')::numeric,
                NULLIF(v_financial->>'average_volume','')::numeric,
                NULLIF(v_financial->>'dividend_yield','')::numeric,
                NULLIF(v_financial->>'dcf_value','')::numeric,
                v_financial->>'currency',
                v_source_name,
                v_source_name,
                v_airbyte_extracted_at,
                v_airbyte_raw_id,
                now(),
                now()
            )
            ON CONFLICT (staging_company_id, as_of_date)
            DO UPDATE
              SET
                market_cap            = EXCLUDED.market_cap,
                stock_price           = EXCLUDED.stock_price,
                beta                  = EXCLUDED.beta,
                price_change_percent  = EXCLUDED.price_change_percent,
                average_volume        = EXCLUDED.average_volume,
                dividend_yield        = EXCLUDED.dividend_yield,
                dcf_value             = EXCLUDED.dcf_value,
                currency              = EXCLUDED.currency,
                data_source           = EXCLUDED.data_source,
                _airbyte_source_name  = EXCLUDED._airbyte_source_name,
                _airbyte_extracted_at = EXCLUDED._airbyte_extracted_at,
                _airbyte_raw_id       = EXCLUDED._airbyte_raw_id,
                updated_at            = now();
        END LOOP;
    END IF;

    --------------------------------------------------------------------------
    -- 5) Upsert Identifiers (array), unique by (staging_company_id, identifier_type).
    --------------------------------------------------------------------------
    IF p_data ? 'identifiers' AND jsonb_typeof(p_data->'identifiers') = 'array' THEN
        FOR v_identifier IN
            SELECT * FROM jsonb_array_elements(p_data->'identifiers')
        LOOP
            IF NOT (v_identifier ? 'identifier_type' AND v_identifier ? 'identifier_value') THEN
                CONTINUE; -- skip malformed
            END IF;

            INSERT INTO staging.company_identifiers_staging (
                staging_company_id,
                identifier_type,
                identifier_value,
                source,
                _airbyte_source_name,
                _airbyte_extracted_at,
                _airbyte_raw_id,
                created_at,
                updated_at
            )
            VALUES (
                v_staging_company_id,
                (v_identifier->>'identifier_type')::public.identifier_type,
                v_identifier->>'identifier_value',
                v_source_name,
                v_source_name,
                v_airbyte_extracted_at,
                v_airbyte_raw_id,
                now(),
                now()
            )
            ON CONFLICT (staging_company_id, identifier_type)
            DO UPDATE
              SET
                identifier_value         = EXCLUDED.identifier_value,
                source                   = EXCLUDED.source,
                _airbyte_source_name     = EXCLUDED._airbyte_source_name,
                _airbyte_extracted_at    = EXCLUDED._airbyte_extracted_at,
                _airbyte_raw_id          = EXCLUDED._airbyte_raw_id,
                updated_at               = now();
        END LOOP;
    END IF;

    --------------------------------------------------------------------------
    -- 6) Upsert People (array), unique by (staging_company_id, name).
    --------------------------------------------------------------------------
    IF p_data ? 'people' AND jsonb_typeof(p_data->'people') = 'array' THEN
        FOR v_person IN
            SELECT * FROM jsonb_array_elements(p_data->'people')
        LOOP
            IF trim(v_person->>'name') = '' THEN
                -- skip if no name
                CONTINUE;
            END IF;

            INSERT INTO staging.company_people_staging (
                staging_company_id,
                name,
                title,
                role_type,
                start_date,
                end_date,
                bio,
                photo_url,
                _airbyte_source_name,
                _airbyte_extracted_at,
                _airbyte_raw_id,
                created_at,
                updated_at
            )
            VALUES (
                v_staging_company_id,
                v_person->>'name',
                v_person->>'title',
                v_person->>'role_type',
                NULLIF(v_person->>'start_date','')::date,
                NULLIF(v_person->>'end_date','')::date,
                v_person->>'bio',
                v_person->>'photo_url',
                v_source_name,
                v_airbyte_extracted_at,
                v_airbyte_raw_id,
                now(),
                now()
            )
            ON CONFLICT (staging_company_id, name)
            DO UPDATE
              SET
                title                  = EXCLUDED.title,
                role_type              = EXCLUDED.role_type,
                start_date             = EXCLUDED.start_date,
                end_date               = EXCLUDED.end_date,
                bio                    = EXCLUDED.bio,
                photo_url              = EXCLUDED.photo_url,
                _airbyte_source_name   = EXCLUDED._airbyte_source_name,
                _airbyte_extracted_at  = EXCLUDED._airbyte_extracted_at,
                _airbyte_raw_id        = EXCLUDED._airbyte_raw_id,
                updated_at             = now();
        END LOOP;
    END IF;

    --------------------------------------------------------------------------
    -- 7) Return a JSON object with the staging_company_id and extracted timestamp
    --------------------------------------------------------------------------
    RETURN jsonb_build_object(
      'staging_company_id', v_staging_company_id,
      'extracted_at', v_airbyte_extracted_at
    );
END;
$$;
