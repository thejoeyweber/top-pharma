"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, ZoomIn, ZoomOut, Maximize2, Filter, RefreshCw } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface GraphNode {
  id: string
  label: string
  type: "company" | "product" | "therapeutic" | "person" | "organization"
  size: number
}

interface GraphLink {
  source: string
  target: string
  type: string
  strength: number
}

// Mock data for the graph
const graphData = {
  nodes: [
    { id: "pfizer", label: "Pfizer", type: "company", size: 30 },
    { id: "novartis", label: "Novartis", type: "company", size: 28 },
    { id: "merck", label: "Merck", type: "company", size: 26 },
    { id: "lipitor", label: "Lipitor", type: "product", size: 20 },
    { id: "viagra", label: "Viagra", type: "product", size: 18 },
    { id: "xeljanz", label: "Xeljanz", type: "product", size: 16 },
    { id: "entresto", label: "Entresto", type: "product", size: 19 },
    { id: "cosentyx", label: "Cosentyx", type: "product", size: 17 },
    { id: "keytruda", label: "Keytruda", type: "product", size: 22 },
    { id: "gardasil", label: "Gardasil", type: "product", size: 18 },
    { id: "oncology", label: "Oncology", type: "therapeutic", size: 25 },
    { id: "cardiology", label: "Cardiology", type: "therapeutic", size: 23 },
    { id: "immunology", label: "Immunology", type: "therapeutic", size: 21 },
    { id: "vaccines", label: "Vaccines", type: "therapeutic", size: 20 },
    { id: "bourla", label: "Albert Bourla", type: "person", size: 15 },
    { id: "narasimhan", label: "Vas Narasimhan", type: "person", size: 15 },
    { id: "davis", label: "Robert Davis", type: "person", size: 15 },
    { id: "fda", label: "FDA", type: "organization", size: 18 },
    { id: "ema", label: "EMA", type: "organization", size: 17 },
  ],
  links: [
    { source: "pfizer", target: "lipitor", type: "markets", strength: 3 },
    { source: "pfizer", target: "viagra", type: "markets", strength: 3 },
    { source: "pfizer", target: "xeljanz", type: "markets", strength: 3 },
    { source: "novartis", target: "entresto", type: "markets", strength: 3 },
    { source: "novartis", target: "cosentyx", type: "markets", strength: 3 },
    { source: "merck", target: "keytruda", type: "markets", strength: 3 },
    { source: "merck", target: "gardasil", type: "markets", strength: 3 },
    { source: "lipitor", target: "cardiology", type: "treats", strength: 2 },
    { source: "entresto", target: "cardiology", type: "treats", strength: 2 },
    { source: "xeljanz", target: "immunology", type: "treats", strength: 2 },
    { source: "cosentyx", target: "immunology", type: "treats", strength: 2 },
    { source: "keytruda", target: "oncology", type: "treats", strength: 2 },
    { source: "gardasil", target: "vaccines", type: "category", strength: 2 },
    { source: "bourla", target: "pfizer", type: "leads", strength: 1 },
    { source: "narasimhan", target: "novartis", type: "leads", strength: 1 },
    { source: "davis", target: "merck", type: "leads", strength: 1 },
    { source: "fda", target: "lipitor", type: "approved", strength: 1 },
    { source: "fda", target: "viagra", type: "approved", strength: 1 },
    { source: "fda", target: "xeljanz", type: "approved", strength: 1 },
    { source: "fda", target: "entresto", type: "approved", strength: 1 },
    { source: "fda", target: "cosentyx", type: "approved", strength: 1 },
    { source: "fda", target: "keytruda", type: "approved", strength: 1 },
    { source: "fda", target: "gardasil", type: "approved", strength: 1 },
    { source: "ema", target: "lipitor", type: "approved", strength: 1 },
    { source: "ema", target: "viagra", type: "approved", strength: 1 },
    { source: "ema", target: "entresto", type: "approved", strength: 1 },
    { source: "ema", target: "keytruda", type: "approved", strength: 1 },
  ],
}

export function RelationshipGraph() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [zoom, setZoom] = useState(1)
  const [centerEntity, setCenterEntity] = useState("pfizer")
  const [relationshipType, setRelationshipType] = useState("all")
  const [isFullscreen, setIsFullscreen] = useState(false)

  // This function renders the graph visualization
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions based on its container
    const resizeCanvas = () => {
      const container = canvas.parentElement
      if (container) {
        canvas.width = container.clientWidth
        canvas.height = container.clientHeight
      }
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Apply zoom
    ctx.save()
    ctx.scale(zoom, zoom)
    ctx.translate(canvas.width / (2 * zoom) - canvas.width / 2, canvas.height / (2 * zoom) - canvas.height / 2)

    // Find the center node
    const centerNode = graphData.nodes.find((node) => node.id === centerEntity) || graphData.nodes[0]

    // Calculate positions for all nodes
    const nodePositions: Record<string, { x: number; y: number }> = {}

    // Position center node in the middle
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    nodePositions[centerNode.id] = { x: centerX, y: centerY }

    // Filter links based on relationship type
    const filteredLinks =
      relationshipType === "all" ? graphData.links : graphData.links.filter((link) => link.type === relationshipType)

    // Find all nodes connected to the center node
    const connectedLinks = filteredLinks.filter(
      (link) => link.source === centerNode.id || link.target === centerNode.id,
    )

    // Position connected nodes in a circle around the center node
    const radius = 150
    connectedLinks.forEach((link, index) => {
      const angle = (2 * Math.PI * index) / connectedLinks.length
      const connectedNodeId = link.source === centerNode.id ? link.target : link.source

      nodePositions[connectedNodeId] = {
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle),
      }
    })

    // Draw connections
    filteredLinks.forEach((link) => {
      // Skip if either node doesn't have a position (not connected to center)
      if (!nodePositions[link.source] || !nodePositions[link.target]) return

      const sourcePos = nodePositions[link.source]
      const targetPos = nodePositions[link.target]
      const sourceNode = graphData.nodes.find((node) => node.id === link.source)
      const targetNode = graphData.nodes.find((node) => node.id === link.target)

      if (sourceNode && targetNode) {
        // Draw line
        ctx.beginPath()
        ctx.moveTo(sourcePos.x, sourcePos.y)
        ctx.lineTo(targetPos.x, targetPos.y)
        ctx.strokeStyle = getColorForType(link.type)
        ctx.lineWidth = link.strength
        ctx.stroke()

        // Draw link label
        const midX = (sourcePos.x + targetPos.x) / 2
        const midY = (sourcePos.y + targetPos.y) / 2
        ctx.fillStyle = "#666"
        ctx.font = "10px sans-serif"
        ctx.textAlign = "center"
        ctx.fillText(link.type, midX, midY)
      }
    })

    // Draw all nodes with positions
    Object.entries(nodePositions).forEach(([nodeId, position]) => {
      const node = graphData.nodes.find((n) => n.id === nodeId)
      if (node) {
        drawNode(ctx, position.x, position.y, node, nodeId === centerNode.id)
      }
    })

    ctx.restore()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [zoom, centerEntity, relationshipType, isFullscreen])

  const drawNode = (ctx: CanvasRenderingContext2D, x: number, y: number, node: GraphNode, isCenter = false) => {
    // Draw circle
    ctx.beginPath()
    ctx.arc(x, y, node.size / 2, 0, Math.PI * 2)
    ctx.fillStyle = getColorForNodeType(node.type)
    ctx.fill()

    if (isCenter) {
      ctx.strokeStyle = "#000"
      ctx.lineWidth = 2
      ctx.stroke()
    }

    // Draw label
    ctx.fillStyle = "#000"
    ctx.font = "bold 12px sans-serif"
    ctx.textAlign = "center"
    ctx.fillText(node.label, x, y + node.size / 2 + 15)
  }

  const getColorForNodeType = (type: string) => {
    switch (type) {
      case "company":
        return "#4f46e5"
      case "product":
        return "#10b981"
      case "therapeutic":
        return "#f59e0b"
      case "person":
        return "#ef4444"
      case "organization":
        return "#8b5cf6"
      default:
        return "#6b7280"
    }
  }

  const getColorForType = (type: string) => {
    switch (type) {
      case "markets":
        return "#4f46e5"
      case "treats":
        return "#10b981"
      case "leads":
        return "#ef4444"
      case "approved":
        return "#8b5cf6"
      case "category":
        return "#f59e0b"
      default:
        return "#6b7280"
    }
  }

  const handleZoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.2, 3))
  }

  const handleZoomOut = () => {
    setZoom((prev) => Math.max(prev - 0.2, 0.5))
  }

  const handleToggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  return (
    <Card className={isFullscreen ? "fixed inset-0 z-50 rounded-none" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle>Relationship Graph</CardTitle>
          <CardDescription>Visualize connections between entities in the pharmaceutical industry</CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={handleZoomIn}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomOut}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleToggleFullscreen}>
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2 items-center justify-between">
            <div className="flex flex-wrap gap-2 items-center">
              <Select value={centerEntity} onValueChange={setCenterEntity}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Center entity" />
                </SelectTrigger>
                <SelectContent>
                  {graphData.nodes.map((node) => (
                    <SelectItem key={node.id} value={node.id}>
                      {node.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={relationshipType} onValueChange={setRelationshipType}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Relationship type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Relationships</SelectItem>
                  <SelectItem value="markets">Markets</SelectItem>
                  <SelectItem value="treats">Treats</SelectItem>
                  <SelectItem value="leads">Leadership</SelectItem>
                  <SelectItem value="approved">Regulatory Approval</SelectItem>
                  <SelectItem value="category">Categorization</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="sm" className="gap-1">
                <Filter className="h-4 w-4" />
                More Filters
              </Button>
            </div>

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <RefreshCw className="h-4 w-4" />
                Reset
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Badge variant="outline" className="bg-[#4f46e5] text-white">
              Company
            </Badge>
            <Badge variant="outline" className="bg-[#10b981] text-white">
              Product
            </Badge>
            <Badge variant="outline" className="bg-[#f59e0b] text-white">
              Therapeutic Area
            </Badge>
            <Badge variant="outline" className="bg-[#ef4444] text-white">
              Person
            </Badge>
            <Badge variant="outline" className="bg-[#8b5cf6] text-white">
              Organization
            </Badge>
          </div>

          <div className={`relative border rounded-md ${isFullscreen ? "h-[calc(100vh-200px)]" : "h-[500px]"}`}>
            <canvas ref={canvasRef} className="w-full h-full" />
          </div>

          <div className="text-xs text-muted-foreground">
            Showing {relationshipType === "all" ? "all relationships" : `'${relationshipType}' relationships`}
            {centerEntity ? ` centered on ${graphData.nodes.find((n) => n.id === centerEntity)?.label}` : ""}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
