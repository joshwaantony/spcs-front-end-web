import Sidebar from "@/components/(admin)/layout/Sidebar";
import OrderViewHeader from "@/components/(admin)/orders/view/OrderViewHeader";
import OrderActionsBar from "@/components/(admin)/orders/view/OrderActionsBar";
import OrderInfoGrid from "@/components/(admin)/orders/view/OrderInfoGrid";
import OrderItems from "@/components/(admin)/orders/view/OrderItems";

export default function OrderViewPage({ params }) {
  const { id } = params;

  // Mock data extracted from your screenshot (replace with API later)
  const order = {
    id,
    orderId: "order_SJyiKTbwxWU47n",
    transactionId: "pay_SJyme72VZ7KK1I",
    orderDate: "24 February, 2026",
    status: "PENDING",

    payment: {
      orderTotal: 440,
      discount: 44,
      shippingCharge: 80,
      totalPaid: 476,
      currency: "Rs",
    },

    contact: {
      name: "Suneesh K",
      phone: "+91 9846400008",
      email: "suneeshk008@gmail.com",
    },

    shipping: {
      name: "Suneesh K",
      addressLines: [
        "Kadukkatt House,",
        "Kodannur PO,",
        "Thrissur, Kerala,",
        "India",
      ],
      pinCode: "680563",
    },

    items: [
      {
        id: "1",
        title: "Nilaude Sukrutham",
        qty: 1,
        unitPrice: 180,
        image:
          "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80",
      },
      {
        id: "2",
        title: "Indiaye Kandethuka",
        qty: 1,
        unitPrice: 120,
        image:
          "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80",
      },
      {
        id: "3",
        title: "Enthanu Bharathiyatha",
        qty: 1,
        unitPrice: 140,
        image:
          "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?w=400&q=80",
      },
    ],
  };

  return (
    <div className="flex min-h-screen p-6 gap-6 bg-background-light dark:bg-background-dark">
      <Sidebar />

      <main className="flex-1 flex flex-col overflow-y-auto pr-6 py-6">
        <OrderViewHeader order={order} />

        <div className="px-3 sm:px-4 lg:px-6">
          <OrderActionsBar order={order} />

          <div className="mt-6">
            <OrderInfoGrid order={order} />
          </div>

          <div className="mt-6 pb-10">
            <OrderItems order={order} />
          </div>
        </div>
      </main>
    </div>
  );
}
