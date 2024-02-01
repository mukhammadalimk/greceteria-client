import { OrdersTable } from "../components/orders/OrdersTable";
import DashboardNav from "../components/dashboard/DashboardNav";
import FilterOptions from "../components/UI/FilterOptions";

const sortOptions = [
  "Sort by: Received",
  "Sort by: Processing",
  "Sort by: On the way",
  "Sort by: Delivered",
];

const priceOptions = [
  "Min $10 -  Max $50",
  "Min $50 - Max $100",
  "Min $100 - Max $150",
  "Min $150 - Max $200",
  "Min $200 - Max $300",
];

const orders = [
  {
    id: "#123",
    date: "8 Sep, 2020",
    total: "$135.00",
    numOfProducts: 5,
    status: "Delivered",
  },
  {
    id: "#234",
    date: "14 Aug, 2021",
    total: "$150.00",
    numOfProducts: 6,
    status: "Delivered",
  },
  {
    id: "#355",
    date: "12 Jan, 2022",
    total: "$300.00",
    numOfProducts: 7,
    status: "Delivered",
  },
  {
    id: "#400",
    date: "12 Mar, 2022",
    total: "$490.00",
    numOfProducts: 10,
    status: "Delivered",
  },
  {
    id: "#444",
    date: "20 Apr, 2022",
    total: "$500.00",
    numOfProducts: 13,
    status: "Processing",
  },
  {
    id: "#244",
    date: "8 Sep, 2020",
    total: "$135.00",
    numOfProducts: 5,
    status: "Delivered",
  },
  {
    id: "#563",
    date: "12 Mar, 2022",
    total: "$490.00",
    numOfProducts: 10,
    status: "Delivered",
  },

  {
    id: "#254",
    date: "12 Jan, 2022",
    total: "$300.00",
    numOfProducts: 7,
    status: "Delivered",
  },

  {
    id: "#632",
    date: "20 Apr, 2022",
    total: "$500.00",
    numOfProducts: 13,
    status: "Processing",
  },
  {
    id: "#643",
    date: "14 Aug, 2021",
    total: "$150.00",
    numOfProducts: 6,
    status: "Delivered",
  },
  {
    id: "#224",
    date: "8 Sep, 2020",
    total: "$135.00",
    numOfProducts: 5,
    status: "Delivered",
  },
];

const OrderHistory = () => {
  return (
    <>
      <div className="section-sm">
        <div className="container">
          <div className="order-history-page dashboard">
            <DashboardNav activeNavItem="Order History" />

            {/* Order History */}
            <div className="dashboard__main">
              <div className="filter__top">
                <FilterOptions
                  options={priceOptions}
                  title="Select Price"
                  className=""
                />
                <FilterOptions
                  options={sortOptions}
                  title="Sort By: Status"
                  className=""
                />
                <div className="date-filter">
                  <input type="date" />
                </div>
                <div className="date-filter">
                  <input type="month" />
                </div>
              </div>
              <OrdersTable orders={orders} text="Order History" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderHistory;
