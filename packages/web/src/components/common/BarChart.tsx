import React from "react";

interface BarChartProps {
  data: { label: string; value: number }[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const max = Math.max(...data.map((d) => d.value));

  return (
    <div className='w-full h-full flex items-end gap-1 md:gap-2'>
      {data.map((item) => {
        const height = (item.value / max) * 100;
        return (
          <div
            key={item.label}
            className='flex-1 h-full flex flex-col justify-end items-center group'
          >
            <span className='font-mono text-[9px] md:text-xs text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity mb-1'>
              {item.value}
            </span>
            <div
              className='w-full bg-slate-500 rounded-t-sm transition-all duration-500 hover:opacity-80'
              style={{ height: `${height}%` }}
            />
            <h1 className='mb-1 md:mb-2 mt-1 text-[10px] md:text-sm text-center leading-tight'>
              {item.label}
            </h1>
          </div>
        );
      })}
    </div>
  );
};

export default BarChart;
