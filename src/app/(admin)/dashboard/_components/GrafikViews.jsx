"use client";

import { format, eachDayOfInterval, subDays, getWeekOfMonth } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { XAxis, Tooltip, ResponsiveContainer, YAxis, CartesianGrid, AreaChart, Area } from 'recharts';
import { CalendarForm } from './calender';

const formatDate = (dateString) => format(new Date(dateString), 'yyyy-MM-dd');


const GrafikViews = () => {


    const [startDate, setStartDate] = useState(subDays(new Date(), 6));
    const [endDate, setEndDate] = useState(new Date());
    const [data, setData] = useState([]);
    const [chartType, setChartType] = useState('daily');

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/posts?limit=10`);
            const response = await res.json();
            const dataPost = response.posts;


            const parsedApiData = dataPost.map(item => ({
                date: formatDate(item.createdAt),
                value: item.views,
            }));

            const combinedData = parsedApiData.reduce((acc, curr) => {
                const existingDataIndex = acc.findIndex(d => d.date === curr.date);
                if (existingDataIndex !== -1) {
                    acc[existingDataIndex].value += curr.value;
                } else {
                    acc.push(curr);
                }
                return acc;
            }, []);

            const allDates = eachDayOfInterval({ start: startDate, end: endDate }).map(date => format(date, 'yyyy-MM-dd'));
            

            const completeData = allDates.map(date => {
                const found = combinedData.find(d => d.date === date);
                return found ? found : { date, value: 0 };
            });

            setData(completeData);
        };

        fetchData();
    }, [startDate, endDate]);

    const handleDateRangeChange = (dates) => {
        setStartDate(dates.from);
        setEndDate(dates.to);
    };

    const handleChartTypeChange = (type) => setChartType(type);

  
   
    const yAxisDomain = [0, 20000];


    const xAxisFormatter = (date) => {
        if (chartType === 'daily') {
            return format(new Date(date), 'eeee');
        } else if (chartType === 'monthly') {
            const weekOfMonth = getWeekOfMonth(new Date(date));
            return `Minggu ${weekOfMonth}`;
        } else if (chartType === 'yearly') {
            return format(new Date(date), 'MMMM');
        }
    };

    return (
        <div className="border p-3 max-w-[1000px]">
            <h1 className="p-3 font-bold">Total Visitors</h1>
            <div className="flex justify-end w-full pr-3">
                <CalendarForm
                    startDate={startDate}
                    endDate={endDate}
                    onDateRangeChange={handleDateRangeChange}
                    onChartTypeChange={handleChartTypeChange}
                />
            </div>

            <ResponsiveContainer width="100%" height={300} minWidth={700}>
                <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={xAxisFormatter} />
                    <YAxis domain={yAxisDomain} />
                    <Tooltip />
                    <Area type="monotone" dataKey="value" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
};

export default GrafikViews;