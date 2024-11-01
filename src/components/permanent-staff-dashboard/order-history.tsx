import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import OrderHistoryCard from "./order-history-card";
import { cn } from '@/lib/utils';
import OrderHistoryEmpty from "./order-history-empty";

import { useQuery } from "@tanstack/react-query";
import { fetchOrders } from "@/lib/api";


export default function OrderHistory() {
    const [activeTab, setActiveTab] = useState('current');
    const { data } = useQuery({
        queryKey: ['ord'],
        queryFn: () => fetchOrders({pageParam: 1}),
    })

    console.log(data)

    return(
    <>
    <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full  mb-4 bg-transparent flex md:justify-start justify-center space-x-2 text-[18px] font-roboto font-[600]">
          <TabsTrigger value="current" className={cn('rounded-full py-2 px-10 data-[state=active]:bg-primary/10 data-[state=active]:text-primary shadow', { 'bg-primary text-white': activeTab === 'current' })}>Current History</TabsTrigger>
          <TabsTrigger value="previous" className={cn('rounded-full py-2 px-10 data-[state=active]:bg-primary/10 data-[state=active]:text-primary shadow', { 'bg-primary text-white': activeTab === 'previous' })}>Previous History</TabsTrigger>
        </TabsList>
        <TabsContent value="current">
        {
            !data?.orders?.length  ? (
                <OrderHistoryEmpty />
            ) : (
                <div className="grid gap-4 md:grid-cols-3">
                  {data?.orders?.filter(e => e.status.toLowerCase() === "pending").map(order => (
                    <OrderHistoryCard
                      key={order.id}
                      {...order}
                      activeTab={activeTab}
                    />
                  ))}
                </div>
            )
        }
        </TabsContent>
        <TabsContent value="previous">
        {
            !data?.orders?.length ? (
                <OrderHistoryEmpty />
            ) : (
                <div className="grid gap-4 md:grid-cols-3">
                    {data?.orders.filter(ordered => (ordered.status.toLowerCase() === "completed" || ordered.status.toLowerCase() === "cancelled")).map(order => (
                    <OrderHistoryCard
                        key={order.id}
                        {...order}
                        activeTab={activeTab}
                    />
                    ))}
                </div>
            )
        }
        </TabsContent>
      </Tabs>
    </>
    )
}