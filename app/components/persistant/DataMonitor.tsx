import React, { useEffect, useState } from 'react';

type MonitorConfig = {
    id: number;
    queryKey: string;
    refreshInterval: number;
    threshold: number;
    normalIcon: string;
    alertIcon: string;
    label?: string;
    unit?: string;
    withGraph?: boolean; // ✅ nouveau champ
};

type MonitorProps = {
    onGetData: (id: string) => Promise<any>;
    config: MonitorConfig;
};

const MAX_HISTORY = 30; // nombre de points max à garder

const DataMonitor: React.FC<MonitorProps> = ({ onGetData, config }) => {
    const [value, setValue] = useState<number | null>(null);
    const [history, setHistory] = useState<number[]>([]);

    const fetchData = () => {
        onGetData(config.queryKey)
            .then(async (data) => {
                const json = await data.json();
                const rawValue = json?.response?.logEntry?.output || null;

                const cleanedValue = rawValue?.trim();
                const parsedValue = cleanedValue ? parseFloat(cleanedValue) : null;

                if (parsedValue !== null && !isNaN(parsedValue)) {
                    setValue(parsedValue);
                    setHistory((prev) => {
                        const next = [...prev, parsedValue];
                        return next.length > MAX_HISTORY ? next.slice(-MAX_HISTORY) : next;
                    });
                } else {
                    console.error('Invalid data:', cleanedValue);
                }
            })
            .catch((err) => console.error('Error fetching data:', err));
    };

    useEffect(() => {
        fetchData();
        const interval = setInterval(fetchData, config.refreshInterval);
        return () => clearInterval(interval);
    }, [config.refreshInterval]);

    const isCritical = value !== null && value >= config.threshold;
    const icon = isCritical ? config.alertIcon : config.normalIcon;

    // ➕ Fonction pour générer une petite ligne SVG
    const renderMiniGraph = () => {
        if (!config.withGraph || history.length < 2) return null;
        const max = Math.max(...history, 1); // éviter div by 0
        const points = history.map((val, i) => {
            const x = (i / (MAX_HISTORY - 1)) * 100;
            const y = 100 - (val / max) * 100;
            return `${x},${y}`;
        }).join(' ');
        return (
            <svg
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="absolute top-0 left-0 w-full h-full opacity-20"
                style={{ width: "100%", height: "100%" }}
            >
                <polyline
                    fill="none"
                    stroke={'#60a5fa'}
                    strokeWidth="2"
                    points={points}
                />
            </svg>
        );
    };

    return (
        <span className={`relative inline-flex items-center justify-center gap-1 overflow-hidden
            ${isCritical ? "bg-yellow-200" : "bg-white/30"} backdrop-blur-md shadow-sm rounded-md text-[10px] p-[2px] px-[4px] h-[24px] min-w-[60px] 
            md:text-[12px] md:h-[32px] md:min-w-[80px] ${isCritical && "text-red-800"}`}
            title={config.label || 'Data Monitor'}
        >
            {renderMiniGraph()}
            <span className={`w-3 h-3 md:w-4 md:h-4 flex-shrink-0 z-10`}>
                <iconify-icon icon={icon} width="100%" height="100%"></iconify-icon>
            </span>
            <span className="font-medium z-10">
                {value !== null ? `${value}${config.unit || ''}` : 'N/A'}
            </span>
        </span>
    );
};

export default DataMonitor;
