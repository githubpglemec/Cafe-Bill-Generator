
import React, { useRef } from "react";
import { OrderItem } from "@/types/cafe";
import { formatDate } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Download, Printer } from "lucide-react";
import { toast } from "sonner";

interface ReceiptPreviewProps {
  orderItems: OrderItem[];
  customerName: string;
  tableNumber: string;
  total: number;
}

const ReceiptPreview: React.FC<ReceiptPreviewProps> = ({
  orderItems,
  customerName,
  tableNumber,
  total
}) => {
  const receiptRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    const content = receiptRef.current;
    if (!content) return;

    const printWindow = window.open('', '_blank');
    if (!printWindow) {
      toast.error("Please allow pop-ups to print the receipt");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>Cafe Receipt</title>
          <link href="https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
          <link href="https://fonts.googleapis.com/css2?family=Courier+Prime:wght@400;700&display=swap" rel="stylesheet">
          <style>
            body {
              font-family: 'Space Mono', 'Courier Prime', monospace;
              padding: 2rem;
              max-width: 350px;
              margin: 0 auto;
              background-color: #f3f3f3;
            }
            * {
              box-sizing: border-box;
            }
            @media print {
              body {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
                background-color: white;
              }
            }
          </style>
        </head>
        <body>
          ${content.innerHTML}
        </body>
      </html>
    `);
    
    printWindow.document.close();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const handleDownload = () => {
    const receipt = receiptRef.current;
    if (!receipt) return;

    try {
      // Create a temporary hidden canvas
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) {
        toast.error("Your browser doesn't support image download");
        return;
      }

      // Get the customer name or default
      const filename = customerName ? 
        `receipt-${customerName.toLowerCase().replace(/\s+/g, '-')}.png` : 
        `receipt-${formatDate(new Date(), "yyyyMMdd-HHmmss")}.png`;

      // Copy the receipt to an image using html2canvas
      // Since we don't have html2canvas, we'll use a simplified approach
      // This is a placeholder - in a real app, you'd use html2canvas or a similar library
      
      toast.success(`Receipt saved! (Actual download would be implemented with html2canvas)`, {
        description: "In a production app, this would download a PNG of the receipt"
      });
    } catch (error) {
      toast.error("Error generating receipt image");
      console.error(error);
    }
  };

  const getSubtotal = () => {
    return total;
  };

  const getTax = () => {
    return total * 0.13; // 13% VAT in Nepal
  };

  const getGrandTotal = () => {
    return getSubtotal() + getTax();
  };

  return (
    <div className="h-[600px] flex flex-col">
      <div className="p-4 border-b bg-zinc-900 text-white flex justify-between items-center">
        <h2 className="font-semibold">Receipt Preview</h2>
        <div className="flex space-x-2">
          <Button 
            size="sm" 
            variant="outline" 
            className="text-white border-white/20 bg-white/10 hover:bg-white/20"
            onClick={handleDownload}
          >
            <Download size={16} className="mr-1" /> Save
          </Button>
          <Button 
            size="sm" 
            onClick={handlePrint}
            className="bg-white text-black hover:bg-white/90"
          >
            <Printer size={16} className="mr-1" /> Print
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto bg-zinc-100 p-4 flex justify-center">
        <div 
          ref={receiptRef}
          className="w-full max-w-[350px] bg-white shadow-lg p-8 font-mono border border-zinc-200"
        >
          <div className="text-center mb-6">
            <h1 className="text-lg font-bold tracking-tight uppercase">HIMALAYAN CAFÉ</h1>
            <p className="text-xs text-zinc-600 mt-1">Thamel, Kathmandu</p>
            <p className="text-xs text-zinc-600">Nepal</p>
          </div>

          <div className="mb-6 text-sm">
            <div className="flex justify-between items-center mb-1">
              <span className="text-zinc-600">Date:</span>
              <span>{formatDate(new Date(), "MMM dd, yyyy")}</span>
            </div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-zinc-600">Time:</span>
              <span>{formatDate(new Date(), "h:mm a")}</span>
            </div>
            {customerName && (
              <div className="flex justify-between items-center mb-1">
                <span className="text-zinc-600">Customer:</span>
                <span>{customerName}</span>
              </div>
            )}
            {tableNumber && (
              <div className="flex justify-between items-center mb-1">
                <span className="text-zinc-600">Table:</span>
                <span>#{tableNumber}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-zinc-600">Bill #:</span>
              <span>{Math.floor(10000 + Math.random() * 90000)}</span>
            </div>
          </div>

          <div className="border-t border-b border-dashed border-zinc-400 py-4 mb-4">
            <div className="flex justify-between text-xs font-semibold text-zinc-600 mb-2 pb-2 border-b border-dotted border-zinc-300">
              <span>ITEM</span>
              <div className="flex w-24">
                <span className="w-8 text-center">QTY</span>
                <span className="flex-1 text-right">PRICE</span>
              </div>
            </div>

            {orderItems.length > 0 ? (
              <div className="space-y-3">
                {orderItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div className="flex-1">
                      <div className="font-medium">{item.name}</div>
                      {item.variant && (
                        <div className="text-xs text-zinc-500">{item.variant}</div>
                      )}
                    </div>
                    <div className="flex w-24">
                      <span className="w-8 text-center">{item.quantity}</span>
                      <span className="flex-1 text-right">
                        Rs. {(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6 text-zinc-500 italic text-sm">
                No items in order
              </div>
            )}
          </div>

          <div className="space-y-1 text-sm mb-6">
            <div className="flex justify-between">
              <span className="text-zinc-600">Subtotal</span>
              <span>Rs. {getSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-600">VAT (13%)</span>
              <span>Rs. {getTax().toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold pt-3 mt-2 border-t border-dotted border-zinc-400">
              <span>TOTAL</span>
              <span>Rs. {getGrandTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className="text-center text-xs text-zinc-600 mt-8">
            <p className="mb-1">धन्यवाद - Thank you for visiting</p>
            <p className="mb-4">Please come again!</p>
            <p className="text-zinc-400 text-[10px]">* * * * * * * * * * * * * * * * * * * * * * * *</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptPreview;
