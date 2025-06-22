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
};

type MonitorProps = {
    onGetData: (id: string) => Promise<any>;
    config: MonitorConfig;
};

const DataMonitor: React.FC<MonitorProps> = ({ onGetData, config }) => {
    const [value, setValue] = useState<number | null>(null);

    const fetchData = () => {
        onGetData(config.queryKey)
            .then(async (data) => {
                const json = await data.json();
                const rawValue = json?.response?.logEntry?.output || null;

                const cleanedValue = rawValue?.trim();
                const parsedValue = cleanedValue ? parseFloat(cleanedValue) : null;

                if (parsedValue !== null && !isNaN(parsedValue)) {
                    setValue(parsedValue);
                } else {
                    console.error('Invalid data:', cleanedValue);
                }
            })
            .catch((err) => console.error('Error fetching data:', err));
    };

    useEffect(() => {
        fetchData();

        const interval = setInterval(() => {
            fetchData();
        }, config.refreshInterval);

        return () => clearInterval(interval);
    }, [config.refreshInterval]);

    const isCritical = value !== null && value >= config.threshold;
    const icon = isCritical ? config.alertIcon : config.normalIcon;
    return (
        <span className={`inline-flex items-center justify-center gap-1 ${isCritical ? "bg-yellow-200" : "bg-white/30"}  backdrop-blur-md shadow-sm rounded-md text-[10px] p-[2px] px-[4px] h-[24px] min-w-[60px] 
            md:text-[12px] md:h-[32px] md:min-w-[80px] ${isCritical && "text-red-800"}`}
            title={config.label || 'Data Monitor'}
        >
            <span className={`w-3 h-3 md:w-4 md:h-4 flex-shrink-0 `}>
                <iconify-icon icon={icon} width="100%" height="100%"></iconify-icon>
            </span>
            <span className="font-medium">
                {value !== null ? `${value}${config.unit || ''}` : 'N/A'}
            </span>
        </span>
    );

};

export default DataMonitor;
