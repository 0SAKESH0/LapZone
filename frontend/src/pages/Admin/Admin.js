import "./Admin.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getAdminProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../api/adminProductApi";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../api/adminOrderApi";

import { getDashboardStats } from "../../api/adminDashboardApi";
import {
  getAllCustomers,
  getCustomerDetails,
} from "../../api/adminCustomerApi";

function Admin() {
  const navigate = useNavigate();

  // ==========================================
  // STATE
  // ==========================================

  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);

  // Customers
  const [customers, setCustomers] = useState([]);
  const [customersLoading, setCustomersLoading] =
    useState(true);
  const [customersError, setCustomersError] =
    useState("");
  const [customerSearch, setCustomerSearch] =
    useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [customerDetailsLoading, setCustomerDetailsLoading] = useState(false);
  const [customerDetailsError, setCustomerDetailsError] = useState("");

  // Product search
  const [productSearch, setProductSearch] =
    useState("");

  const [brandFilter, setBrandFilter] =
    useState("all");

  const [categoryFilter, setCategoryFilter] =
    useState("all");

  const [stockFilter, setStockFilter] =
    useState("all");

  // Dashboard
  const [dashboardStats, setDashboardStats] =
    useState(null);

  const [dashboardLoading, setDashboardLoading] =
    useState(true);

  // Loading / errors
  const [loading, setLoading] =
    useState(true);

  const [ordersLoading, setOrdersLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [ordersError, setOrdersError] =
    useState("");

  // Product form
  const [showForm, setShowForm] =
    useState(false);

  const [editingProduct, setEditingProduct] =
    useState(null);

  // Order modal
  const [selectedOrder, setSelectedOrder] =
    useState(null);

  const [updatingStatus, setUpdatingStatus] =
    useState(false);

  const [selectedStatus, setSelectedStatus] =
    useState("");

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    price: "",
    rating: "",
    discount: "",
    category: "",
    image: "",
    description: "",
    processor: "",
    ram: "",
    storage: "",
    display: "",
    battery: "",
    warranty: "",
    stock: "",
  });

  // ==========================================
  // LOAD PRODUCTS
  // ==========================================

  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getAdminProducts();

      setProducts(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch products:",
        error
      );

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        setError(
          "You do not have admin access."
        );
      } else {
        setError(
          "Unable to load products."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOAD ORDERS
  // ==========================================

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);
      setOrdersError("");

      const response =
        await getAllOrders();

      setOrders(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch orders:",
        error
      );

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        setOrdersError(
          "You do not have permission to view orders."
        );
      } else {
        setOrdersError(
          "Unable to load orders."
        );
      }
    } finally {
      setOrdersLoading(false);
    }
  };

  // ==========================================
  // LOAD CUSTOMERS
  // ==========================================

  const fetchCustomers = async () => {
    try {
      setCustomersLoading(true);
      setCustomersError("");

      const response =
        await getAllCustomers();

      setCustomers(response.data);
    } catch (error) {
      console.error(
        "Failed to fetch customers:",
        error
      );

      if (
        error.response?.status === 401 ||
        error.response?.status === 403
      ) {
        setCustomersError(
          "You do not have permission to view customers."
        );
      } else {
        setCustomersError(
          "Unable to load customers."
        );
      }
    } finally {
      setCustomersLoading(false);
    }
  };

  // ==========================================
  // LOAD DASHBOARD STATS
  // ==========================================

  const fetchDashboardStats =
    async () => {
      try {
        setDashboardLoading(true);

        const response =
          await getDashboardStats();

        setDashboardStats(
          response.data
        );
      } catch (error) {
        console.error(
          "Failed to fetch dashboard stats:",
          error
        );
      } finally {
        setDashboardLoading(false);
      }
    };

  // ==========================================
  // LOAD ALL DATA
  // ==========================================

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetchDashboardStats();
    fetchProducts();
    fetchOrders();
    fetchCustomers();
  }, [navigate]);

  // ==========================================
  // HANDLE FORM INPUT
  // ==========================================

  const handleInputChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // ==========================================
  // OPEN ADD PRODUCT FORM
  // ==========================================

  const openAddProductForm = () => {
    setEditingProduct(null);

    setFormData({
      name: "",
      brand: "",
      price: "",
      rating: "",
      discount: "",
      category: "",
      image: "",
      description: "",
      processor: "",
      ram: "",
      storage: "",
      display: "",
      battery: "",
      warranty: "",
      stock: "",
    });

    setShowForm(true);
  };

  // ==========================================
  // OPEN EDIT PRODUCT FORM
  // ==========================================

  const openEditProductForm = (
    product
  ) => {
    setEditingProduct(product);

    setFormData({
      name: product.name || "",
      brand: product.brand || "",
      price: product.price ?? "",
      rating: product.rating ?? "",
      discount: product.discount || "",
      category: product.category || "",
      image: product.image || "",
      description:
        product.description || "",
      processor:
        product.processor || "",
      ram: product.ram || "",
      storage:
        product.storage || "",
      display:
        product.display || "",
      battery:
        product.battery || "",
      warranty:
        product.warranty || "",
      stock: product.stock ?? "",
    });

    setShowForm(true);
  };

  // ==========================================
  // CLOSE PRODUCT FORM
  // ==========================================

  const closeProductForm = () => {
    setShowForm(false);
    setEditingProduct(null);
  };

  // ==========================================
  // SUBMIT PRODUCT
  // ==========================================

  const handleProductSubmit =
    async (e) => {
      e.preventDefault();

      try {
        const productData = {
          ...formData,
          price: Number(
            formData.price
          ),
          rating: Number(
            formData.rating
          ),
          stock: Number(
            formData.stock
          ),
        };

        if (editingProduct) {
          await updateProduct(
            editingProduct.id,
            productData
          );
        } else {
          await createProduct(
            productData
          );
        }

        closeProductForm();

        await fetchProducts();
        await fetchDashboardStats();
      } catch (error) {
        console.error(
          "Failed to save product:",
          error
        );

        alert(
          error.response?.data?.message ||
            "Unable to save product."
        );
      }
    };

  // ==========================================
  // DELETE PRODUCT
  // ==========================================

  const handleDeleteProduct =
    async (product) => {
      const confirmed =
        window.confirm(
          `Are you sure you want to delete "${product.name}"?`
        );

      if (!confirmed) {
        return;
      }

      try {
        await deleteProduct(
          product.id
        );

        await fetchProducts();
        await fetchDashboardStats();
      } catch (error) {
        console.error(
          "Failed to delete product:",
          error
        );

        alert(
          error.response?.data?.message ||
            "Unable to delete product."
        );
      }
    };

  // ==========================================
  // PRODUCT FILTERS
  // ==========================================

  const clearProductFilters =
    () => {
      setProductSearch("");
      setBrandFilter("all");
      setCategoryFilter("all");
      setStockFilter("all");
    };

  const availableBrands = [
    ...new Set(
      products
        .map(
          (product) =>
            product.brand
        )
        .filter(Boolean)
    ),
  ].sort();

  const availableCategories = [
    ...new Set(
      products
        .map(
          (product) =>
            product.category
        )
        .filter(Boolean)
    ),
  ].sort();

  const filteredProducts =
    products.filter(
      (product) => {
        const search =
          productSearch
            .toLowerCase()
            .trim();

        const matchesSearch =
          !search ||
          product.name
            ?.toLowerCase()
            .includes(search) ||
          product.brand
            ?.toLowerCase()
            .includes(search) ||
          product.category
            ?.toLowerCase()
            .includes(search);

        const matchesBrand =
          brandFilter === "all" ||
          product.brand ===
            brandFilter;

        const matchesCategory =
          categoryFilter ===
            "all" ||
          product.category ===
            categoryFilter;

        let matchesStock = true;

        if (
          stockFilter ===
          "in-stock"
        ) {
          matchesStock =
            Number(product.stock) >
            0;
        }

        if (
          stockFilter ===
          "out-of-stock"
        ) {
          matchesStock =
            Number(product.stock) <=
            0;
        }

        if (
          stockFilter ===
          "low-stock"
        ) {
          matchesStock =
            Number(product.stock) >
              0 &&
            Number(product.stock) <=
              5;
        }

        return (
          matchesSearch &&
          matchesBrand &&
          matchesCategory &&
          matchesStock
        );
      }
    );

  // ==========================================
  // CUSTOMER SEARCH
  // ==========================================

  const filteredCustomers =
    customers.filter(
      (customer) => {
        const search =
          customerSearch
            .toLowerCase()
            .trim();

        if (!search) {
          return true;
        }

        return (
          customer.name
            ?.toLowerCase()
            .includes(search) ||
          customer.email
            ?.toLowerCase()
            .includes(search) ||
          String(customer.id)
            .toLowerCase()
            .includes(search)
        );
      }
    );

    // ==========================================
// CUSTOMER DETAILS
// ==========================================

const openCustomerDetails = async (customerId) => {
  try {
    setCustomerDetailsLoading(true);
    setCustomerDetailsError("");
    setSelectedCustomer(null);

    const response = await getCustomerDetails(customerId);

    setSelectedCustomer(response.data);
  } catch (error) {
    console.error(
      "Failed to fetch customer details:",
      error
    );

    if (
      error.response?.status === 401 ||
      error.response?.status === 403
    ) {
      setCustomerDetailsError(
        "You do not have permission to view this customer."
      );
    } else if (error.response?.status === 404) {
      setCustomerDetailsError(
        "Customer not found."
      );
    } else {
      setCustomerDetailsError(
        "Unable to load customer details."
      );
    }
  } finally {
    setCustomerDetailsLoading(false);
  }
};

const closeCustomerDetails = () => {
  setSelectedCustomer(null);
  setCustomerDetailsError("");
};

  // ==========================================
  // ORDER DETAILS
  // ==========================================

  const openOrderDetails =
    (order) => {
      setSelectedOrder(order);

      setSelectedStatus(
        order.status ||
          "PLACED"
      );
    };

  const closeOrderDetails =
    () => {
      setSelectedOrder(null);
      setSelectedStatus("");
    };

  // ==========================================
  // UPDATE ORDER STATUS
  // ==========================================

  const handleUpdateOrderStatus =
    async () => {
      if (!selectedOrder) {
        return;
      }

      if (
        selectedStatus ===
        selectedOrder.status
      ) {
        alert(
          "Please select a different status."
        );
        return;
      }

      try {
        setUpdatingStatus(true);

        const response =
          await updateOrderStatus(
            selectedOrder.id,
            selectedStatus
          );

        setSelectedOrder(
          response.data
        );

        setOrders(
          (currentOrders) =>
            currentOrders.map(
              (order) =>
                order.id ===
                selectedOrder.id
                  ? response.data
                  : order
            )
        );

        await fetchDashboardStats();

        alert(
          "Order status updated successfully!"
        );
      } catch (error) {
        console.error(
          "Failed to update order status:",
          error
        );

        alert(
          error.response?.data ||
            "Failed to update order status."
        );
      } finally {
        setUpdatingStatus(
          false
        );
      }
    };

  // ==========================================
  // FORMAT DATE
  // ==========================================

  const formatDate = (
    date
  ) => {
    if (!date) {
      return "N/A";
    }

    return new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // ==========================================
  // FORMAT DATE + TIME
  // ==========================================

  const formatDateTime = (
    date
  ) => {
    if (!date) {
      return "N/A";
    }

    return new Date(
      date
    ).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  // ==========================================
  // STATUS CLASS
  // ==========================================

  const getStatusClass =
    (status) => {
      switch (status) {
        case "PLACED":
          return "status-placed";

        case "CONFIRMED":
          return "status-confirmed";

        case "SHIPPED":
          return "status-shipped";

        case "DELIVERED":
          return "status-delivered";

        case "CANCELLED":
          return "status-cancelled";

        default:
          return "";
      }
    };

  // ==========================================
  // DASHBOARD VALUES
  // ==========================================


  const placedOrders =
    dashboardStats?.placedOrders ??
    0;

  const confirmedOrders =
    dashboardStats?.confirmedOrders ??
    0;

  const shippedOrders =
    dashboardStats?.shippedOrders ??
    0;

  const deliveredOrders =
    dashboardStats?.deliveredOrders ??
    0;

  const cancelledOrders =
    dashboardStats?.cancelledOrders ??
    0;

  const lowStockProducts =
    products.filter(
      (product) =>
        Number(product.stock) >
          0 &&
        Number(product.stock) <=
          5
    );

  const recentOrders =
    orders.slice(0, 5);

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-loading">
          <h2>
            Loading Products...
          </h2>
        </div>
      </div>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <div className="admin-page">
        <div className="admin-error">

          <span className="admin-label">
            LAPZONE ADMIN
          </span>

          <h1>
            Access Denied
          </h1>

          <p>
            {error}
          </p>

          <button
            onClick={() =>
              navigate("/")
            }
          >
            Go Home
          </button>

        </div>
      </div>
    );
  }

  // ==========================================
  // MAIN ADMIN PAGE
  // ==========================================

  return (
    <div className="admin-page">

      {/* ======================================
          HEADER
      ====================================== */}

      <div className="admin-header">

        <div>

          <span className="admin-label">
            LAPZONE ADMIN
          </span>

          <h1>
            Admin Dashboard
          </h1>

          <p>
            Manage products and
            customer orders.
          </p>

        </div>

        <div className="admin-product-count">

          <strong>
            {products.length}
          </strong>

          <span>
            Products
          </span>

        </div>

      </div>

      {/* ======================================
          DASHBOARD STATISTICS
      ====================================== */}

      <div className="admin-dashboard-stats">

        {dashboardLoading ? (

          <div className="dashboard-stats-loading">
            Loading dashboard
            statistics...
          </div>

        ) : dashboardStats ? (

          <>

            <div className="dashboard-stat-card">

              <span>
                Total Products
              </span>

              <strong>
                {dashboardStats.totalProducts}
              </strong>

              <small>
                Products in inventory
              </small>

            </div>

            <div className="dashboard-stat-card">

              <span>
                Total Orders
              </span>

              <strong>
                {dashboardStats.totalOrders}
              </strong>

              <small>
                Customer orders
              </small>

            </div>

            <div className="dashboard-stat-card">

              <span>
                Total Customers
              </span>

              <strong>
                {dashboardStats.totalCustomers}
              </strong>

              <small>
                Registered customers
              </small>

            </div>

            <div className="dashboard-stat-card">

              <span>
                Revenue
              </span>

              <strong>
                ₹{" "}
                {Number(
                  dashboardStats.totalRevenue ||
                    0
                ).toLocaleString(
                  "en-IN"
                )}
              </strong>

              <small>
                Total revenue
              </small>

            </div>

          </>

        ) : null}

      </div>

      {/* ======================================
          ORDER OVERVIEW
      ====================================== */}

      <div className="admin-order-overview">

        <div className="admin-section-heading">

          <div>

            <h2>
              Order Overview
            </h2>

            <p>
              Current order status
              across the store.
            </p>

          </div>

        </div>

        <div className="admin-order-overview-grid">

          <div className="admin-order-overview-card">
            <span>Placed</span>
            <strong>
              {placedOrders}
            </strong>
          </div>

          <div className="admin-order-overview-card">
            <span>Confirmed</span>
            <strong>
              {confirmedOrders}
            </strong>
          </div>

          <div className="admin-order-overview-card">
            <span>Shipped</span>
            <strong>
              {shippedOrders}
            </strong>
          </div>

          <div className="admin-order-overview-card">
            <span>Delivered</span>
            <strong>
              {deliveredOrders}
            </strong>
          </div>

          <div className="admin-order-overview-card">
            <span>Cancelled</span>
            <strong>
              {cancelledOrders}
            </strong>
          </div>

        </div>

      </div>
            {/* ======================================
          LOW STOCK PRODUCTS
      ====================================== */}

      <section className="low-stock-section">

        <div className="admin-section-heading">

          <div>
            <h2>
              Low Stock Products
            </h2>

            <p>
              Products that may need
              restocking.
            </p>
          </div>

          <span className="admin-section-count">
            {lowStockProducts.length}
          </span>

        </div>

        {lowStockProducts.length === 0 ? (

          <div className="low-stock-empty">

            <h3>
              Stock looks good
            </h3>

            <p>
              There are no products
              with low stock right now.
            </p>

          </div>

        ) : (

          <div className="low-stock-list">

            {lowStockProducts.map(
              (product) => (

                <div
                  key={product.id}
                  className="low-stock-card"
                >

                  <div className="low-stock-image">

                    {product.image ? (

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                    ) : (

                      <div className="admin-no-image">
                        No Image
                      </div>

                    )}

                  </div>

                  <div className="low-stock-info">

                    <strong>
                      {product.name}
                    </strong>

                    <span>
                      {product.brand}
                    </span>

                  </div>

                  <div className="low-stock-value">

                    <span>
                      Stock
                    </span>

                    <strong>
                      {product.stock}
                    </strong>

                  </div>

                  <button
                    className="admin-edit-button"
                    onClick={() =>
                      openEditProductForm(
                        product
                      )
                    }
                  >
                    Edit
                  </button>

                </div>

              )
            )}

          </div>

        )}

      </section>


      {/* ======================================
          RECENT ORDERS
      ====================================== */}

      <section className="recent-orders-section">

        <div className="admin-section-heading">

          <div>

            <h2>
              Recent Orders
            </h2>

            <p>
              The latest orders placed
              by customers.
            </p>

          </div>

          <span className="admin-section-count">
            {recentOrders.length}
          </span>

        </div>


        {ordersLoading ? (

          <div className="admin-loading">
            Loading recent orders...
          </div>

        ) : ordersError ? (

          <div className="admin-error">
            {ordersError}
          </div>

        ) : recentOrders.length === 0 ? (

          <div className="recent-orders-empty">

            <h3>
              No orders yet
            </h3>

            <p>
              Recent customer orders
              will appear here.
            </p>

          </div>

        ) : (

          <div className="recent-orders-list">

            {recentOrders.map(
              (order) => (

                <div
                  key={order.id}
                  className="recent-order-card"
                >

                  {/* ORDER */}

                  <div className="recent-order-info">

                    <span>
                      Order
                    </span>

                    <strong>
                      #{order.id}
                    </strong>

                  </div>


                  {/* CUSTOMER */}

                  <div className="recent-order-info">

                    <span>
                      Customer
                    </span>

                    <strong>
                      {order.customerName ||
                        order.user?.name ||
                        "Customer"}
                    </strong>

                  </div>


                  {/* DATE */}

                  <div className="recent-order-info">

                    <span>
                      Date
                    </span>

                    <strong>
                      {formatDate(
                        order.createdAt
                      )}
                    </strong>

                  </div>


                  {/* TOTAL */}

                  <div className="recent-order-info">

                    <span>
                      Total
                    </span>

                    <strong>
                      ₹{" "}
                      {Number(
                        order.total ||
                          order.totalAmount ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>


                  {/* STATUS */}

                  <div className="recent-order-info">

                    <span>
                      Status
                    </span>

                    <strong
                      className={`admin-status-badge ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status ||
                        "PLACED"}
                    </strong>

                  </div>


                  {/* VIEW */}

                  <button
                    className="admin-view-order-button"
                    onClick={() =>
                      openOrderDetails(
                        order
                      )
                    }
                  >
                    View
                  </button>

                </div>

              )
            )}

          </div>

        )}

      </section>


      {/* ======================================
          CUSTOMER MANAGEMENT
      ====================================== */}

      <section className="admin-customers-section">

        <div className="admin-section-heading">

          <div>

            <h2>
              Customer Management
            </h2>

            <p>
              View registered customers
              and their order activity.
            </p>

          </div>

        </div>


        <div className="admin-action-bar">

          <div>

            <span className="admin-product-count">

              {filteredCustomers.length}{" "}
              customers

            </span>

          </div>


          <div className="admin-customer-search">

            <input
              type="text"
              placeholder="Search customers..."
              value={customerSearch}
              onChange={(e) =>
                setCustomerSearch(
                  e.target.value
                )
              }
            />

            {customerSearch && (

              <button
                type="button"
                className="admin-customer-search-clear"
                onClick={() =>
                  setCustomerSearch("")
                }
                aria-label="Clear customer search"
              >
                ×
              </button>

            )}

          </div>

        </div>


        {customersLoading ? (

          <div className="admin-customers-loading">
            Loading customers...
          </div>

        ) : customersError ? (

          <div className="admin-customers-error">
            {customersError}
          </div>

        ) : filteredCustomers.length === 0 ? (

          <div className="admin-customers-empty">

            <h3>

              {customerSearch
                ? "No customers found"
                : "No customers yet"}

            </h3>

            <p>

              {customerSearch
                ? "Try a different name, email, or customer ID."
                : "Registered customers will appear here."}

            </p>

          </div>

        ) : (

          <div className="admin-customers-list">

            {filteredCustomers.map(
              (customer) => {

                const firstLetter =
                  customer.name
                    ?.trim()
                    ?.charAt(0) || "?";

                return (

                  <div
  key={customer.id}
  className="admin-customer-card"
  onClick={() => openCustomerDetails(customer.id)}
  role="button"
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      openCustomerDetails(customer.id);
    }
  }}
>

                    {/* AVATAR */}

                    <div className="admin-customer-avatar">
                      {firstLetter}
                    </div>


                    {/* CUSTOMER */}

                    <div className="admin-customer-info">

                      <span>
                        Customer
                      </span>

                      <strong>
                        {customer.name}
                      </strong>

                      <p>
                        {customer.email}
                      </p>

                    </div>


                    {/* ID */}

                    <div className="admin-customer-id">

                      <span>
                        Customer ID
                      </span>

                      <strong>
                        #{customer.id}
                      </strong>

                    </div>


                    {/* ORDERS */}

                    <div className="admin-customer-orders">

                      <span>
                        Orders
                      </span>

                      <strong>
                        {customer.orderCount}
                      </strong>

                    </div>


                    {/* JOINED */}

                    <div className="admin-customer-date">

                      <span>
                        Joined
                      </span>

                      <strong>
                        {formatDate(
                          customer.createdAt
                        )}
                      </strong>

                    </div>

                  </div>

                );
              }
            )}

          </div>

        )}

      </section>


      {/* ======================================
          PRODUCT MANAGEMENT
      ====================================== */}

      <section className="admin-products-section">

        <div className="admin-section-heading">

          <div>

            <h2>
              Product Management
            </h2>

            <p>
              Add, edit, search and
              manage products.
            </p>

          </div>

        </div>


        <div className="admin-action-bar">

          <div className="admin-product-count">

            Showing{" "}

            <strong>
              {filteredProducts.length}
            </strong>{" "}

            of{" "}

            <strong>
              {products.length}
            </strong>{" "}

            products

          </div>


          <button
            className="admin-add-product-button"
            onClick={openAddProductForm}
          >
            + Add Product
          </button>

        </div>


        {/* PRODUCT FILTERS */}

        <div className="admin-product-filters">

          {/* SEARCH */}

          <div className="admin-product-search">

            <input
              type="text"
              placeholder="Search products..."
              value={productSearch}
              onChange={(e) =>
                setProductSearch(
                  e.target.value
                )
              }
            />

            {productSearch && (

              <button
                type="button"
                onClick={() =>
                  setProductSearch("")
                }
              >
                ×
              </button>

            )}

          </div>


          {/* BRAND */}

          <select
            value={brandFilter}
            onChange={(e) =>
              setBrandFilter(
                e.target.value
              )
            }
          >

            <option value="all">
              All Brands
            </option>

            {availableBrands.map(
              (brand) => (

                <option
                  key={brand}
                  value={brand}
                >
                  {brand}
                </option>

              )
            )}

          </select>


          {/* CATEGORY */}

          <select
            value={categoryFilter}
            onChange={(e) =>
              setCategoryFilter(
                e.target.value
              )
            }
          >

            <option value="all">
              All Categories
            </option>

            {availableCategories.map(
              (category) => (

                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>

              )
            )}

          </select>


          {/* STOCK */}

          <select
            value={stockFilter}
            onChange={(e) =>
              setStockFilter(
                e.target.value
              )
            }
          >

            <option value="all">
              All Stock
            </option>

            <option value="in-stock">
              In Stock
            </option>

            <option value="low-stock">
              Low Stock
            </option>

            <option value="out-of-stock">
              Out of Stock
            </option>

          </select>


          {/* CLEAR */}

          {(productSearch ||
            brandFilter !== "all" ||
            categoryFilter !== "all" ||
            stockFilter !== "all") && (

            <button
              type="button"
              className="admin-clear-filters-button"
              onClick={
                clearProductFilters
              }
            >
              Clear Filters
            </button>

          )}

        </div>


        {/* PRODUCT LIST */}

        {filteredProducts.length === 0 ? (

          <div className="admin-products-empty">

            <h3>
              No products found
            </h3>

            <p>
              Try changing your
              search or filters.
            </p>

          </div>

        ) : (

          <div className="admin-products-list">

            {filteredProducts.map(
              (product) => (

                <div
                  key={product.id}
                  className="admin-product-card"
                >

                  {/* IMAGE */}

                  <div className="admin-product-image">

                    {product.image ? (

                      <img
                        src={product.image}
                        alt={product.name}
                      />

                    ) : (

                      <div className="admin-no-image">
                        No Image
                      </div>

                    )}

                  </div>


                  {/* PRODUCT INFO */}

                  <div className="admin-product-info">

                    <div className="admin-product-main-info">

                      <span className="admin-product-brand">
                        {product.brand}
                      </span>

                      <h3>
                        {product.name}
                      </h3>

                      <p className="admin-product-category">
                        {product.category ||
                          "Uncategorized"}
                      </p>

                    </div>


                    <div className="admin-product-details">

                      {/* PRICE */}

                      <div>

                        <span>
                          Price
                        </span>

                        <strong>
                          ₹{" "}
                          {Number(
                            product.price ||
                              0
                          ).toLocaleString(
                            "en-IN"
                          )}
                        </strong>

                      </div>


                      {/* STOCK */}

                      <div>

                        <span>
                          Stock
                        </span>

                        <strong
                          className={
                            Number(
                              product.stock
                            ) <= 0
                              ? "admin-stock-out"
                              : Number(
                                    product.stock
                                  ) <= 5
                              ? "admin-stock-low"
                              : "admin-stock-good"
                          }
                        >
                          {product.stock}
                        </strong>

                      </div>


                      {/* RATING */}

                      <div>

                        <span>
                          Rating
                        </span>

                        <strong>
                          {product.rating ||
                            "N/A"}
                        </strong>

                      </div>

                    </div>

                  </div>


                  {/* ACTIONS */}

                  <div className="admin-product-actions">

                    <button
                      className="admin-edit-button"
                      onClick={() =>
                        openEditProductForm(
                          product
                        )
                      }
                    >
                      Edit
                    </button>

                    <button
                      className="admin-delete-button"
                      onClick={() =>
                        handleDeleteProduct(
                          product
                        )
                      }
                    >
                      Delete
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </section>
            {/* ======================================
          ORDER MANAGEMENT
      ====================================== */}

      <section className="admin-orders-section">

        <div className="admin-section-heading">

          <div>

            <h2>
              Order Management
            </h2>

            <p>
              Review customer orders and
              update their status.
            </p>

          </div>

        </div>


        {ordersLoading ? (

          <div className="admin-loading">
            Loading orders...
          </div>

        ) : ordersError ? (

          <div className="admin-error">
            {ordersError}
          </div>

        ) : orders.length === 0 ? (

          <div className="admin-orders-empty">

            <h3>
              No orders yet
            </h3>

            <p>
              Customer orders will
              appear here.
            </p>

          </div>

        ) : (

          <div className="admin-orders-list">

            {orders.map(
              (order) => (

                <div
                  key={order.id}
                  className="admin-order-card"
                >

                  {/* ORDER ID */}

                  <div className="admin-order-info">

                    <span>
                      Order
                    </span>

                    <strong>
                      #
                      {String(
                        order.id
                      ).padStart(
                        6,
                        "0"
                      )}
                    </strong>

                  </div>


                  {/* CUSTOMER */}

                  <div className="admin-order-info">

                    <span>
                      Customer
                    </span>

                    <strong>
                      {order.customerName ||
                        order.user?.name ||
                        "Customer"}
                    </strong>

                    <p>
                      {order.email ||
                        order.user?.email ||
                        ""}
                    </p>

                  </div>


                  {/* TOTAL */}

                  <div className="admin-order-info">

                    <span>
                      Total
                    </span>

                    <strong>
                      ₹{" "}
                      {Number(
                        order.total ||
                          order.totalAmount ||
                          0
                      ).toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>


                  {/* STATUS */}

                  <div className="admin-order-info">

                    <span>
                      Status
                    </span>

                    <strong
                      className={`admin-status-badge ${getStatusClass(
                        order.status
                      )}`}
                    >
                      {order.status ||
                        "PLACED"}
                    </strong>

                  </div>


                  {/* DATE */}

                  <div className="admin-order-info">

                    <span>
                      Date
                    </span>

                    <strong>
                      {order.createdAt
                        ? new Date(
                            order.createdAt
                          ).toLocaleDateString(
                            "en-IN"
                          )
                        : "-"}
                    </strong>

                  </div>


                  {/* VIEW DETAILS */}

                  <div className="admin-order-view">

                    <button
                      className="view-order-btn"
                      onClick={() =>
                        openOrderDetails(
                          order
                        )
                      }
                    >
                      View Details
                    </button>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </section>


      {/* ======================================
          ORDER DETAILS MODAL
      ====================================== */}

      {selectedOrder && (

        <div className="order-details-overlay">

          <div className="order-details-modal">

            {/* HEADER */}

            <div className="order-details-header">

              <div>

                <span className="admin-label">
                  ORDER DETAILS
                </span>

                <h2>
                  Order #
                  {String(
                    selectedOrder.id
                  ).padStart(
                    6,
                    "0"
                  )}
                </h2>

                <p>
                  Review the order
                  information below.
                </p>

              </div>


              <button
                className="order-details-close"
                onClick={
                  closeOrderDetails
                }
                type="button"
              >
                ×
              </button>

            </div>


            {/* ORDER INFORMATION */}

            <div className="order-details-content">

              <div className="order-details-grid">

                {/* CUSTOMER */}

                <div className="order-details-info">

                  <span>
                    Customer
                  </span>

                  <strong>
                    {selectedOrder.customerName ||
                      selectedOrder.user?.name ||
                      "Customer"}
                  </strong>

                  <p>
                    {selectedOrder.email ||
                      selectedOrder.user?.email ||
                      ""}
                  </p>

                </div>


                {/* ORDER ID */}

                <div className="order-details-info">

                  <span>
                    Order ID
                  </span>

                  <strong>
                    #
                    {String(
                      selectedOrder.id
                    ).padStart(
                      6,
                      "0"
                    )}
                  </strong>

                </div>


                {/* TOTAL */}

                <div className="order-details-info">

                  <span>
                    Total Amount
                  </span>

                  <strong>
                    ₹{" "}
                    {Number(
                      selectedOrder.total ||
                        selectedOrder.totalAmount ||
                        0
                    ).toLocaleString(
                      "en-IN"
                    )}
                  </strong>

                </div>


                {/* STATUS */}

                <div className="order-details-info">

                  <span>
                    Current Status
                  </span>

                  <strong
                    className={`admin-status-badge ${getStatusClass(
                      selectedOrder.status
                    )}`}
                  >
                    {selectedOrder.status ||
                      "PLACED"}
                  </strong>

                </div>

              </div>


              {/* ORDER ITEMS */}

              {selectedOrder.items &&
                selectedOrder.items.length >
                  0 && (

                  <div className="order-items-section">

                    <div className="order-items-header">

                      <h3>
                        Order Items
                      </h3>

                    </div>


                    <div className="order-items-list">

                      {selectedOrder.items.map(
                        (item, index) => (

                          <div
                            key={
                              item.id ||
                              item.productId ||
                              index
                            }
                            className="order-item-card"
                          >

                            <div className="order-item-image">

                              {item.image ? (

                                <img
                                  src={
                                    item.image
                                  }
                                  alt={
                                    item.name ||
                                    "Product"
                                  }
                                />

                              ) : (

                                <div className="admin-no-image">
                                  No Image
                                </div>

                              )}

                            </div>


                            <div className="order-item-info">

                              <strong>
                                {item.name ||
                                  item.productName ||
                                  "Product"}
                              </strong>

                              <span>
                                Qty:{" "}
                                {item.quantity ||
                                  item.qty ||
                                  1}
                              </span>

                            </div>


                            <div className="order-item-price">

                              <strong>
                                ₹{" "}
                                {Number(
                                  item.price ||
                                    0
                                ).toLocaleString(
                                  "en-IN"
                                )}
                              </strong>

                            </div>

                          </div>

                        )
                      )}

                    </div>

                  </div>

                )}


              {/* UPDATE STATUS */}

              <div className="order-status-update">

                <div>

                  <span>
                    Update Order Status
                  </span>

                  <select
                    value={
                      selectedStatus
                    }
                    onChange={(e) =>
                      setSelectedStatus(
                        e.target.value
                      )
                    }
                    disabled={
                      updatingStatus
                    }
                  >

                    <option value="PLACED">
                      Placed
                    </option>

                    <option value="CONFIRMED">
                      Confirmed
                    </option>

                    <option value="SHIPPED">
                      Shipped
                    </option>

                    <option value="DELIVERED">
                      Delivered
                    </option>

                    <option value="CANCELLED">
                      Cancelled
                    </option>

                  </select>

                </div>


                <button
                  className="update-status-btn"
                  onClick={
                    handleUpdateOrderStatus
                  }
                  disabled={
                    updatingStatus ||
                    selectedStatus ===
                      selectedOrder.status
                  }
                >
                  {updatingStatus
                    ? "Updating..."
                    : "Update Status"}
                </button>

              </div>


              {/* ORDER DATE */}

              <div className="order-details-footer">

                <span>
                  Order placed
                </span>

                <strong>
                  {formatDateTime(
                    selectedOrder.createdAt
                  )}
                </strong>

              </div>

            </div>

          </div>

        </div>

      )}


      {/* ======================================
          ADD / EDIT PRODUCT MODAL
      ====================================== */}

      {showForm && (

        <div className="product-form-overlay">

          <div className="product-form-modal">

            {/* FORM HEADER */}

            <div className="product-form-header">

              <div>

                <span className="admin-label">
                  PRODUCT MANAGEMENT
                </span>

                <h2>
                  {editingProduct
                    ? "Edit Product"
                    : "Add Product"}
                </h2>

                <p>
                  {editingProduct
                    ? "Update the product information below."
                    : "Add a new laptop to your store."}
                </p>

              </div>


              <button
                className="product-form-close"
                onClick={
                  closeProductForm
                }
                type="button"
              >
                ×
              </button>

            </div>


            {/* PRODUCT FORM */}

            <form
              className="product-form"
              onSubmit={
                handleProductSubmit
              }
            >

              {/* BASIC INFORMATION */}

              <div className="product-form-section">

                <div className="product-form-section-header">

                  <h3>
                    Basic Information
                  </h3>

                  <p>
                    Main details customers
                    will see.
                  </p>

                </div>


                <div className="product-form-grid">

                  {/* NAME */}

                  <div className="form-group full-width">

                    <label>
                      Product Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={
                        formData.name
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="Enter product name"
                      required
                    />

                  </div>


                  {/* BRAND */}

                  <div className="form-group">

                    <label>
                      Brand
                    </label>

                    <input
                      type="text"
                      name="brand"
                      value={
                        formData.brand
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. Apple"
                      required
                    />

                  </div>


                  {/* CATEGORY */}

                  <div className="form-group">

                    <label>
                      Category
                    </label>

                    <input
                      type="text"
                      name="category"
                      value={
                        formData.category
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. Gaming"
                    />

                  </div>


                  {/* PRICE */}

                  <div className="form-group">

                    <label>
                      Price
                    </label>

                    <input
                      type="number"
                      name="price"
                      value={
                        formData.price
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="Enter price"
                      min="0"
                      step="0.01"
                      required
                    />

                  </div>


                  {/* RATING */}

                  <div className="form-group">

                    <label>
                      Rating
                    </label>

                    <input
                      type="number"
                      name="rating"
                      value={
                        formData.rating
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. 4.5"
                      min="0"
                      max="5"
                      step="0.1"
                    />

                  </div>


                  {/* DISCOUNT */}

                  <div className="form-group">

                    <label>
                      Discount
                    </label>

                    <input
                      type="text"
                      name="discount"
                      value={
                        formData.discount
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. 15% OFF"
                    />

                  </div>


                  {/* STOCK */}

                  <div className="form-group">

                    <label>
                      Stock
                    </label>

                    <input
                      type="number"
                      name="stock"
                      value={
                        formData.stock
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="Enter stock quantity"
                      min="0"
                      required
                    />

                  </div>


                  {/* IMAGE */}

                  <div className="form-group full-width">

                    <label>
                      Product Image URL
                    </label>

                    <input
                      type="text"
                      name="image"
                      value={
                        formData.image
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="https://..."
                    />

                  </div>


                  {/* DESCRIPTION */}

                  <div className="form-group full-width">

                    <label>
                      Description
                    </label>

                    <textarea
                      name="description"
                      value={
                        formData.description
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="Enter product description"
                      rows="5"
                    />

                  </div>

                </div>

              </div>


              {/* SPECIFICATIONS */}

              <div className="product-form-section">

                <div className="product-form-section-header">

                  <h3>
                    Specifications
                  </h3>

                  <p>
                    Technical information
                    for the laptop.
                  </p>

                </div>


                <div className="product-form-grid">

                  {/* PROCESSOR */}

                  <div className="form-group">

                    <label>
                      Processor
                    </label>

                    <input
                      type="text"
                      name="processor"
                      value={
                        formData.processor
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. Intel Core i7"
                    />

                  </div>


                  {/* RAM */}

                  <div className="form-group">

                    <label>
                      RAM
                    </label>

                    <input
                      type="text"
                      name="ram"
                      value={
                        formData.ram
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. 16GB"
                    />

                  </div>


                  {/* STORAGE */}

                  <div className="form-group">

                    <label>
                      Storage
                    </label>

                    <input
                      type="text"
                      name="storage"
                      value={
                        formData.storage
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. 512GB SSD"
                    />

                  </div>


                  {/* DISPLAY */}

                  <div className="form-group">

                    <label>
                      Display
                    </label>

                    <input
                      type="text"
                      name="display"
                      value={
                        formData.display
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. 15.6 inch FHD"
                    />

                  </div>


                  {/* BATTERY */}

                  <div className="form-group">

                    <label>
                      Battery
                    </label>

                    <input
                      type="text"
                      name="battery"
                      value={
                        formData.battery
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. Up to 10 hours"
                    />

                  </div>


                  {/* WARRANTY */}

                  <div className="form-group">

                    <label>
                      Warranty
                    </label>

                    <input
                      type="text"
                      name="warranty"
                      value={
                        formData.warranty
                      }
                      onChange={
                        handleInputChange
                      }
                      placeholder="e.g. 1 Year"
                    />

                  </div>

                </div>

              </div>


              {/* FORM ACTIONS */}

              <div className="product-form-actions">

                <button
                  type="button"
                  className="cancel-product-btn"
                  onClick={
                    closeProductForm
                  }
                >
                  Cancel
                </button>


                <button
                  type="submit"
                  className="save-product-btn"
                >
                  {editingProduct
                    ? "Update Product"
                    : "Add Product"}
                </button>

              </div>

            </form>

          </div>

        </div>

      )}

    </div>
  );
}

export default Admin;