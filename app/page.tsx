"use client";

import { useState } from "react";
import { Phone, ShoppingBag, CheckCircle, XCircle, Clock } from "lucide-react";

interface Order {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  items: string[];
  totalAmount: number;
  deliveryAddress: string;
  status: "pending" | "calling" | "confirmed" | "cancelled" | "no-response";
}

export default function Home() {
  const [orders, setOrders] = useState<Order[]>([
    {
      orderId: "OD12345678",
      customerName: "Rajesh Kumar",
      phoneNumber: "+91 98765 43210",
      items: ["Samsung Galaxy M32", "Boat Headphones"],
      totalAmount: 15999,
      deliveryAddress: "123, MG Road, Bangalore - 560001",
      status: "pending",
    },
    {
      orderId: "OD12345679",
      customerName: "Priya Sharma",
      phoneNumber: "+91 98765 43211",
      items: ["Nike Sports Shoes", "Adidas T-Shirt"],
      totalAmount: 4599,
      deliveryAddress: "456, Nehru Nagar, Mumbai - 400001",
      status: "pending",
    },
    {
      orderId: "OD12345680",
      customerName: "Amit Patel",
      phoneNumber: "+91 98765 43212",
      items: ["HP Laptop", "Logitech Mouse"],
      totalAmount: 45999,
      deliveryAddress: "789, Ring Road, Delhi - 110001",
      status: "confirmed",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isCallActive, setIsCallActive] = useState(false);
  const [callScript, setCallScript] = useState<string[]>([]);

  const startCall = (order: Order) => {
    setSelectedOrder(order);
    setIsCallActive(true);
    setOrders(
      orders.map((o) =>
        o.orderId === order.orderId ? { ...o, status: "calling" } : o
      )
    );

    // Simulate AI agent calling script
    const script = [
      `📞 कॉल शुरू हो रही है...`,
      `🤖 नमस्ते ${order.customerName} जी, मैं Flipkart की तरफ से बोल रहा हूं।`,
      `📦 आपका ऑर्डर नंबर ${order.orderId} है।`,
      `🛍️ आपने ${order.items.join(", ")} ऑर्डर किया है।`,
      `💰 कुल राशि ₹${order.totalAmount.toLocaleString("en-IN")} है।`,
      `📍 डिलीवरी एड्रेस: ${order.deliveryAddress}`,
      `❓ क्या आप इस ऑर्डर को कन्फर्म करना चाहते हैं?`,
    ];

    let index = 0;
    const interval = setInterval(() => {
      if (index < script.length) {
        setCallScript((prev) => [...prev, script[index]]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 2000);
  };

  const confirmOrder = () => {
    if (selectedOrder) {
      setOrders(
        orders.map((o) =>
          o.orderId === selectedOrder.orderId ? { ...o, status: "confirmed" } : o
        )
      );
      setCallScript((prev) => [
        ...prev,
        `✅ धन्यवाद! आपका ऑर्डर कन्फर्म हो गया है।`,
        `🚚 डिलीवरी 2-3 दिन में होगी।`,
        `📞 कॉल समाप्त हो रही है...`,
      ]);
      setTimeout(() => {
        setIsCallActive(false);
        setCallScript([]);
        setSelectedOrder(null);
      }, 3000);
    }
  };

  const cancelOrder = () => {
    if (selectedOrder) {
      setOrders(
        orders.map((o) =>
          o.orderId === selectedOrder.orderId ? { ...o, status: "cancelled" } : o
        )
      );
      setCallScript((prev) => [
        ...prev,
        `❌ ठीक है, आपका ऑर्डर कैंसल कर दिया गया है।`,
        `💳 रिफंड 5-7 दिनों में मिलेगा।`,
        `📞 कॉल समाप्त हो रही है...`,
      ]);
      setTimeout(() => {
        setIsCallActive(false);
        setCallScript([]);
        setSelectedOrder(null);
      }, 3000);
    }
  };

  const getStatusIcon = (status: Order["status"]) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "calling":
        return <Phone className="w-5 h-5 text-blue-600 animate-pulse" />;
      case "no-response":
        return <Clock className="w-5 h-5 text-gray-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusText = (status: Order["status"]) => {
    switch (status) {
      case "confirmed":
        return "कन्फर्म";
      case "cancelled":
        return "कैंसल";
      case "calling":
        return "कॉल में...";
      case "no-response":
        return "जवाब नहीं";
      default:
        return "पेंडिंग";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-flipkart-blue text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <ShoppingBag className="w-8 h-8" />
            <div>
              <h1 className="text-2xl font-bold">Flipkart Order Confirmation Agent</h1>
              <p className="text-blue-100 text-sm">AI-Powered Customer Call System</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Orders List */}
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              ऑर्डर लिस्ट
            </h2>
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.orderId}
                  className="border-2 border-gray-200 rounded-lg p-4 hover:border-flipkart-blue transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-lg text-gray-800">
                        {order.customerName}
                      </h3>
                      <p className="text-sm text-gray-600">{order.orderId}</p>
                      <p className="text-sm text-gray-600">{order.phoneNumber}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="text-sm font-semibold">
                        {getStatusText(order.status)}
                      </span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <p className="text-sm text-gray-700 font-medium">आइटम्स:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {order.items.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-bold text-green-700">
                      ₹{order.totalAmount.toLocaleString("en-IN")}
                    </p>
                    {order.status === "pending" && (
                      <button
                        onClick={() => startCall(order)}
                        disabled={isCallActive}
                        className="bg-flipkart-blue text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Phone className="w-4 h-4" />
                        कॉल करें
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call Interface */}
          <div className="bg-white rounded-xl shadow-xl p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
              <Phone className="w-6 h-6" />
              कॉल इंटरफ़ेस
            </h2>
            {!isCallActive ? (
              <div className="flex items-center justify-center h-96 text-gray-400">
                <div className="text-center">
                  <Phone className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">कोई एक्टिव कॉल नहीं है</p>
                  <p className="text-sm">ऑर्डर पर "कॉल करें" बटन दबाएं</p>
                </div>
              </div>
            ) : (
              <div>
                {/* Call Header */}
                <div className="bg-gradient-to-r from-flipkart-blue to-blue-600 text-white rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold">{selectedOrder?.customerName}</h3>
                      <p className="text-blue-100">{selectedOrder?.phoneNumber}</p>
                    </div>
                    <Phone className="w-8 h-8 animate-pulse" />
                  </div>
                  <div className="text-sm">
                    <p>ऑर्डर: {selectedOrder?.orderId}</p>
                    <p className="font-bold text-lg mt-1">
                      ₹{selectedOrder?.totalAmount.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>

                {/* Call Script */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6 h-64 overflow-y-auto">
                  {callScript.map((line, idx) => (
                    <div
                      key={idx}
                      className="mb-3 p-3 bg-white rounded-lg shadow-sm animate-fade-in"
                    >
                      <p className="text-gray-800">{line}</p>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={confirmOrder}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    कन्फर्म करें
                  </button>
                  <button
                    onClick={cancelOrder}
                    className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    कैंसल करें
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-flipkart-blue">
              {orders.filter((o) => o.status === "pending").length}
            </p>
            <p className="text-gray-600 mt-2">पेंडिंग</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-green-600">
              {orders.filter((o) => o.status === "confirmed").length}
            </p>
            <p className="text-gray-600 mt-2">कन्फर्म</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-red-600">
              {orders.filter((o) => o.status === "cancelled").length}
            </p>
            <p className="text-gray-600 mt-2">कैंसल</p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <p className="text-3xl font-bold text-blue-600">
              {orders.filter((o) => o.status === "calling").length}
            </p>
            <p className="text-gray-600 mt-2">कॉल में</p>
          </div>
        </div>
      </main>
    </div>
  );
}
