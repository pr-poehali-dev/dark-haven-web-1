import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Wire {
  id: string;
  color: string;
  label: string;
  startPosition: number;
  endPosition: number;
}

interface WireCaptchaProps {
  onSuccess: () => void;
}

export default function WireCaptcha({ onSuccess }: WireCaptchaProps) {
  const [wires] = useState<Wire[]>([
    { id: 'green', color: '#22c55e', label: 'НЗ', startPosition: 0, endPosition: 1 },
    { id: 'yellow', color: '#eab308', label: 'СВ', startPosition: 1, endPosition: 2 },
    { id: 'orange', color: '#f97316', label: 'ВВ', startPosition: 2, endPosition: 0 }
  ]);
  
  const [leftConnectors] = useState([
    { id: 'left-0', label: 'НЗ', position: 0, expectedColor: 'green' },
    { id: 'left-1', label: 'СВ', position: 1, expectedColor: 'yellow' },
    { id: 'left-2', label: 'ВВ', position: 2, expectedColor: 'orange' }
  ]);
  
  const [rightConnectors] = useState([
    { id: 'right-0', label: 'ВВ', position: 0, expectedColor: 'orange' },
    { id: 'right-1', label: 'НЗ', position: 1, expectedColor: 'green' },
    { id: 'right-2', label: 'СВ', position: 2, expectedColor: 'yellow' }
  ]);
  
  const [connections, setConnections] = useState<{ [key: string]: string }>({});
  const [draggingWire, setDraggingWire] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    if (Object.keys(connections).length === 3) {
      checkSolution();
    }
  }, [connections]);

  const checkSolution = () => {
    const isCorrect = 
      connections['green'] === 'right-1' &&
      connections['yellow'] === 'right-2' &&
      connections['orange'] === 'right-0';
    
    if (isCorrect) {
      setIsComplete(true);
      setTimeout(() => {
        onSuccess();
      }, 1000);
    } else {
      setAttempts(prev => prev + 1);
      setTimeout(() => {
        setConnections({});
      }, 500);
    }
  };

  const handleDragStart = (wireId: string) => {
    setDraggingWire(wireId);
  };

  const handleDrop = (connectorId: string) => {
    if (draggingWire) {
      setConnections(prev => ({ ...prev, [draggingWire]: connectorId }));
      setDraggingWire(null);
    }
  };

  const getWireColor = (wireId: string) => {
    const wire = wires.find(w => w.id === wireId);
    return wire?.color || '#ffffff';
  };

  const getConnectedWire = (connectorId: string) => {
    return Object.entries(connections).find(([_, target]) => target === connectorId)?.[0];
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur">
      <Card className="cyber-border w-full max-w-2xl bg-card/90 backdrop-blur animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-primary text-shadow-glow">
            Система безопасности
          </CardTitle>
          <CardDescription>
            Соедините провода с правильными клеммами
          </CardDescription>
          {attempts > 0 && (
            <p className="text-destructive text-sm mt-2">
              Неверно! Попыток: {attempts}
            </p>
          )}
        </CardHeader>
        <CardContent>
          <div className="relative h-96 flex items-center justify-between px-8">
            {/* Left connectors */}
            <div className="flex flex-col gap-12">
              {leftConnectors.map((connector, index) => {
                const wire = wires[index];
                return (
                  <div
                    key={connector.id}
                    className="flex items-center gap-4"
                  >
                    <div
                      className="h-12 w-12 rounded-full border-4 cursor-grab active:cursor-grabbing transition-all hover:scale-110"
                      style={{ 
                        borderColor: wire.color,
                        backgroundColor: wire.color + '20',
                        boxShadow: `0 0 20px ${wire.color}80`
                      }}
                      draggable
                      onDragStart={() => handleDragStart(wire.id)}
                    >
                      <div 
                        className="h-full w-full flex items-center justify-center font-bold text-sm"
                        style={{ color: wire.color }}
                      >
                        {connector.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Connection lines */}
            <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
              {Object.entries(connections).map(([wireId, targetId]) => {
                const startIndex = wires.findIndex(w => w.id === wireId);
                const endIndex = rightConnectors.findIndex(c => c.id === targetId);
                
                if (startIndex === -1 || endIndex === -1) return null;
                
                const startY = 80 + startIndex * 120;
                const endY = 80 + endIndex * 120;
                
                return (
                  <line
                    key={`${wireId}-${targetId}`}
                    x1="15%"
                    y1={startY}
                    x2="85%"
                    y2={endY}
                    stroke={getWireColor(wireId)}
                    strokeWidth="4"
                    strokeLinecap="round"
                    className="transition-all duration-300"
                    style={{
                      filter: `drop-shadow(0 0 8px ${getWireColor(wireId)})`
                    }}
                  />
                );
              })}
            </svg>

            {/* Right connectors */}
            <div className="flex flex-col gap-12">
              {rightConnectors.map((connector) => {
                const connectedWire = getConnectedWire(connector.id);
                const wireColor = connectedWire ? getWireColor(connectedWire) : '#666';
                
                return (
                  <div
                    key={connector.id}
                    className="flex items-center gap-4"
                  >
                    <div
                      className="h-12 w-12 rounded-full border-4 transition-all hover:scale-110"
                      style={{ 
                        borderColor: wireColor,
                        backgroundColor: wireColor + '20',
                        boxShadow: connectedWire ? `0 0 20px ${wireColor}80` : 'none'
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDrop(connector.id)}
                    >
                      <div 
                        className="h-full w-full flex items-center justify-center font-bold text-sm"
                        style={{ color: wireColor }}
                      >
                        {connector.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {isComplete && (
            <div className="mt-6 text-center">
              <p className="text-green-400 font-bold text-lg mb-2">
                ✓ Доступ разрешён!
              </p>
              <div className="h-1 bg-green-400 rounded animate-pulse" />
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <Button
              variant="outline"
              onClick={() => setConnections({})}
              className="border-muted text-muted-foreground"
            >
              Сбросить
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
