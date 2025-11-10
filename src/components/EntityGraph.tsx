import { useEffect, useRef, useState } from 'react';
import type { Entity } from '../lib/mockData';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ZoomIn, ZoomOut, Maximize2 } from 'lucide-react';

interface EntityGraphProps {
  entity: Entity;
}

interface Node {
  id: string;
  label: string;
  x: number;
  y: number;
  type: 'entity' | 'account' | 'related';
  risk?: number;
}

interface Edge {
  from: string;
  to: string;
  label: string;
  strength: number;
}

export function EntityGraph({ entity }: EntityGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const nodes: Node[] = [
    // Central entity
    { 
      id: entity.id, 
      label: entity.name, 
      x: 400, 
      y: 300, 
      type: 'entity',
      risk: entity.riskScore 
    },
    // Accounts
    ...entity.accounts.map((acc, idx) => ({
      id: acc.accountId,
      label: `${acc.accountType}\n${acc.accountId}`,
      x: 400 + Math.cos(idx * Math.PI * 2 / entity.accounts.length) * 150,
      y: 300 + Math.sin(idx * Math.PI * 2 / entity.accounts.length) * 150,
      type: 'account' as const
    })),
    // Related entities
    ...entity.relationships.map((rel, idx) => ({
      id: rel.entityId,
      label: rel.entityName,
      x: 400 + Math.cos((idx + entity.accounts.length) * Math.PI * 2 / (entity.accounts.length + entity.relationships.length)) * 250,
      y: 300 + Math.sin((idx + entity.accounts.length) * Math.PI * 2 / (entity.accounts.length + entity.relationships.length)) * 250,
      type: 'related' as const
    }))
  ];

  const edges: Edge[] = [
    // Edges from entity to accounts
    ...entity.accounts.map(acc => ({
      from: entity.id,
      to: acc.accountId,
      label: 'owns',
      strength: 1
    })),
    // Edges from entity to related entities
    ...entity.relationships.map(rel => ({
      from: entity.id,
      to: rel.entityId,
      label: rel.relationshipType,
      strength: rel.strength
    }))
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    canvas.width = 800;
    canvas.height = 600;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Apply transformations
    ctx.save();
    ctx.translate(pan.x, pan.y);
    ctx.scale(zoom, zoom);

    // Draw edges
    edges.forEach(edge => {
      const fromNode = nodes.find(n => n.id === edge.from);
      const toNode = nodes.find(n => n.id === edge.to);
      if (!fromNode || !toNode) return;

      ctx.beginPath();
      ctx.moveTo(fromNode.x, fromNode.y);
      ctx.lineTo(toNode.x, toNode.y);
      
      // Edge color based on strength
      const alpha = 0.3 + (edge.strength * 0.5);
      ctx.strokeStyle = `rgba(100, 116, 139, ${alpha})`;
      ctx.lineWidth = 1 + (edge.strength * 2);
      ctx.stroke();

      // Draw edge label
      const midX = (fromNode.x + toNode.x) / 2;
      const midY = (fromNode.y + toNode.y) / 2;
      ctx.fillStyle = '#64748b';
      ctx.font = '10px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(edge.label, midX, midY - 5);
    });

    // Draw nodes
    nodes.forEach(node => {
      // Node colors based on type
      let fillColor = '#f1f5f9';
      let strokeColor = '#94a3b8';
      let radius = 40;

      if (node.type === 'entity') {
        fillColor = node.risk && node.risk > 75 ? '#fee2e2' : '#dbeafe';
        strokeColor = node.risk && node.risk > 75 ? '#ef4444' : '#3b82f6';
        radius = 50;
      } else if (node.type === 'account') {
        fillColor = '#f0fdf4';
        strokeColor = '#22c55e';
        radius = 35;
      } else if (node.type === 'related') {
        fillColor = '#fef3c7';
        strokeColor = '#f59e0b';
        radius = 40;
      }

      // Draw node circle
      ctx.beginPath();
      ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
      ctx.fillStyle = fillColor;
      ctx.fill();
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Draw node label
      ctx.fillStyle = '#1e293b';
      ctx.font = node.type === 'entity' ? 'bold 12px sans-serif' : '11px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Handle multi-line labels
      const lines = node.label.split('\n');
      lines.forEach((line, idx) => {
        ctx.fillText(
          line.length > 20 ? line.substring(0, 20) + '...' : line,
          node.x,
          node.y + (idx - lines.length / 2 + 0.5) * 14
        );
      });

      // Draw risk score for entity nodes
      if (node.type === 'entity' && node.risk) {
        ctx.fillStyle = '#64748b';
        ctx.font = '10px sans-serif';
        ctx.fillText(`Risk: ${node.risk}`, node.x, node.y + radius + 12);
      }
    });

    ctx.restore();
  }, [entity, zoom, pan, nodes, edges]);

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.2, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <Badge variant="outline" className="bg-blue-50 border-blue-200">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
            Entity
          </Badge>
          <Badge variant="outline" className="bg-green-50 border-green-200">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2" />
            Account
          </Badge>
          <Badge variant="outline" className="bg-amber-50 border-amber-200">
            <div className="w-3 h-3 rounded-full bg-amber-500 mr-2" />
            Related Entity
          </Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleZoomOut}>
            <ZoomOut className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleZoomIn}>
            <ZoomIn className="w-4 h-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={handleReset}>
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="border rounded-lg bg-white overflow-hidden">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="cursor-move"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        />
      </div>

      <div className="text-sm text-slate-500">
        <p>Drag to pan • Use zoom controls to explore the network</p>
        <p className="mt-1">
          Showing {nodes.length} nodes and {edges.length} relationships
        </p>
      </div>
    </div>
  );
}
