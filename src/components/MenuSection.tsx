
import React, { useState } from "react";
import { Coffee, UtensilsCrossed, Wine, Cookie } from "lucide-react";
import { OrderItem } from "@/types/cafe";
import { cafeMenu } from "@/data/cafe-menu";

interface MenuSectionProps {
  addToOrder: (item: Omit<OrderItem, "id" | "quantity">) => void;
  orderItems: OrderItem[];
  updateQuantity: (id: string, quantity: number) => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ 
  addToOrder, 
  orderItems,
  updateQuantity 
}) => {
  const [activeCategory, setActiveCategory] = useState("drinks");

  const categories = [
    { id: "drinks", label: "Drinks", icon: <Coffee size={18} /> },
    { id: "food", label: "Food", icon: <UtensilsCrossed size={18} /> },
    { id: "desserts", label: "Desserts", icon: <Cookie size={18} /> },
    { id: "alcohol", label: "Alcohol", icon: <Wine size={18} /> },
  ];

  // Get items in current category
  const items = cafeMenu[activeCategory as keyof typeof cafeMenu];

  // Get count of item in order
  const getItemCount = (name: string, variant?: string) => {
    const item = orderItems.find(i => i.name === name && i.variant === variant);
    return item ? item.quantity : 0;
  };

  return (
    <div className="h-[600px] flex flex-col">
      <div className="flex items-center border-b">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 font-medium text-sm transition-colors ${
              activeCategory === category.id
                ? "text-primary border-b-2 border-primary -mb-px"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {category.icon}
            {category.label}
          </button>
        ))}
      </div>

      <div className="overflow-y-auto flex-1 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((item) => (
            <div
              key={`${item.name}-${item.id}`}
              className="p-4 rounded-lg bg-card hover:bg-accent/10 transition-colors border"
            >
              <div className="flex justify-between mb-2">
                <h3 className="font-medium">{item.name}</h3>
                <span className="font-semibold">${item.price.toFixed(2)}</span>
              </div>
              
              {item.description && (
                <p className="text-sm text-muted-foreground mb-3">
                  {item.description}
                </p>
              )}

              {item.variants ? (
                <div className="space-y-2 mt-2">
                  {item.variants.map((variant) => (
                    <div 
                      key={variant.name} 
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center">
                        <span className="text-sm">{variant.name}</span>
                        {variant.price > item.price && (
                          <span className="text-xs ml-2 text-muted-foreground">
                            +${(variant.price - item.price).toFixed(2)}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center space-x-1">
                        {getItemCount(item.name, variant.name) > 0 && (
                          <>
                            <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded">
                              {getItemCount(item.name, variant.name)}
                            </span>
                            <span className="px-1">·</span>
                          </>
                        )}
                        <button
                          onClick={() => addToOrder({
                            name: item.name,
                            price: variant.price,
                            category: activeCategory,
                            variant: variant.name
                          })}
                          className="text-xs px-2 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded font-medium transition-colors"
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-end mt-2">
                  {getItemCount(item.name) > 0 && (
                    <>
                      <span className="text-xs font-medium bg-primary/10 text-primary px-2 py-0.5 rounded mr-2">
                        {getItemCount(item.name)}
                      </span>
                      <span className="px-1">·</span>
                    </>
                  )}
                  <button
                    onClick={() => addToOrder({
                      name: item.name,
                      price: item.price,
                      category: activeCategory
                    })}
                    className="text-xs px-2 py-1 bg-primary/10 hover:bg-primary/20 text-primary rounded font-medium transition-colors"
                  >
                    Add
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuSection;
