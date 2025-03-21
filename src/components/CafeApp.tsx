
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MenuSection from "@/components/MenuSection";
import ReceiptPreview from "@/components/ReceiptPreview";
import { OrderItem } from "@/types/cafe";
import { toast } from "sonner";
import { generateOrderId } from "@/lib/utils";

const CafeApp = () => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [tableNumber, setTableNumber] = useState("");

  const addToOrder = (item: Omit<OrderItem, "id" | "quantity">) => {
    setOrderItems((prev) => {
      // Check if item already exists in order
      const existingItem = prev.find((i) => i.name === item.name && i.variant === item.variant);
      
      if (existingItem) {
        // Increment quantity if item exists
        return prev.map((i) => 
          i.name === item.name && i.variant === item.variant 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        );
      } else {
        // Add new item with quantity 1
        return [...prev, { ...item, id: generateOrderId(), quantity: 1 }];
      }
    });
    
    toast.success(`Added ${item.name} to order`);
  };

  const updateQuantity = (id: string, quantity: number) => {
    setOrderItems((prev) => {
      if (quantity <= 0) {
        return prev.filter((item) => item.id !== id);
      }
      
      return prev.map((item) => 
        item.id === id ? { ...item, quantity } : item
      );
    });
  };

  const removeItem = (id: string) => {
    setOrderItems((prev) => prev.filter((item) => item.id !== id));
    toast.info("Item removed from order");
  };

  const clearOrder = () => {
    setOrderItems([]);
    setCustomerName("");
    setTableNumber("");
    toast.info("Order cleared");
  };

  const total = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="w-full max-w-6xl mx-auto">
      <header className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">Café Receipt Generator</h1>
        <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto">
          Select menu items to create a beautiful, modern receipt for your café
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="overflow-hidden border-none shadow-lg">
          <Tabs defaultValue="menu" className="w-full">
            <TabsList className="w-full grid grid-cols-2">
              <TabsTrigger value="menu">Menu Selection</TabsTrigger>
              <TabsTrigger value="customize">Order Details</TabsTrigger>
            </TabsList>
            <TabsContent value="menu" className="p-0">
              <CardContent className="p-0">
                <MenuSection 
                  addToOrder={addToOrder} 
                  orderItems={orderItems}
                  updateQuantity={updateQuantity}
                />
              </CardContent>
            </TabsContent>
            <TabsContent value="customize">
              <CardContent className="p-6 space-y-4">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label htmlFor="customerName" className="text-sm font-medium">
                        Customer Name
                      </label>
                      <input
                        id="customerName"
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Customer name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="tableNumber" className="text-sm font-medium">
                        Table Number
                      </label>
                      <input
                        id="tableNumber"
                        type="text"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        placeholder="Table number"
                        value={tableNumber}
                        onChange={(e) => setTableNumber(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h3 className="text-lg font-semibold mb-3">Current Order</h3>
                  {orderItems.length === 0 ? (
                    <div className="text-center py-6 text-muted-foreground">
                      No items added to the order yet
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {orderItems.map((item) => (
                        <div 
                          key={item.id} 
                          className="flex items-center justify-between p-3 bg-secondary/50 rounded-lg"
                        >
                          <div>
                            <div className="font-medium">{item.name}</div>
                            {item.variant && (
                              <div className="text-sm text-muted-foreground">{item.variant}</div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="w-6 h-6 flex items-center justify-center rounded bg-primary/10 hover:bg-primary/20 text-primary font-medium"
                              >
                                -
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="w-6 h-6 flex items-center justify-center rounded bg-primary/10 hover:bg-primary/20 text-primary font-medium"
                              >
                                +
                              </button>
                            </div>
                            <div className="font-medium w-16 text-right">
                              ${(item.price * item.quantity).toFixed(2)}
                            </div>
                            <button 
                              onClick={() => removeItem(item.id)}
                              className="text-destructive hover:text-destructive/70 p-1"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex justify-between pt-3 font-medium border-t">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                      
                      <button
                        onClick={clearOrder}
                        className="w-full mt-4 py-2 rounded-md border border-destructive/30 text-destructive hover:bg-destructive/10 transition-colors"
                      >
                        Clear Order
                      </button>
                    </div>
                  )}
                </div>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        <Card className="border-none shadow-lg overflow-hidden">
          <CardContent className="p-0">
            <ReceiptPreview 
              orderItems={orderItems} 
              customerName={customerName}
              tableNumber={tableNumber}
              total={total}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CafeApp;
