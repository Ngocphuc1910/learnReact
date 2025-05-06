import React, { useState, useEffect } from 'react';
import Card from './components/ui/Card';
import Button from './components/ui/Button';
import usePromiseStore from './lib/promiseStore';

const PromisesDemo = () => {
  // Local state
  const [selectedTab, setSelectedTab] = useState('basic');
  const [selectedUserId, setSelectedUserId] = useState(1);
  const [selectedOrderId, setSelectedOrderId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [userData, setUserData] = useState({ name: 'Guest User', email: 'guest@example.com', id: 1 });
  const [checkoutResult, setCheckoutResult] = useState(null);
  const [promiseChainResult, setPromiseChainResult] = useState(null);
  
  // Get state and actions from store
  const {
    products,
    orders,
    userOrders,
    orderDetails,
    searchResults,
    cart,
    isLoading,
    error,
    fetchProducts,
    fetchOrders,
    fetchUserOrders,
    fetchOrderDetails,
    searchForProducts,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    checkout,
    tryUnreliableOperation,
    resetError
  } = usePromiseStore();
  
  // Fetch initial data
  useEffect(() => {
    // Using Promise chaining to load initial data
    fetchProducts()
      .then(() => fetchOrders())
      .catch(err => {
        console.error('Error loading initial data:', err);
      });
  }, [fetchProducts, fetchOrders]);
  
  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Handle user order fetching
  const handleFetchUserOrders = () => {
    fetchUserOrders(selectedUserId)
      .then(orders => {
        console.log(`Fetched ${orders.length} orders for user ${selectedUserId}`);
      })
      .catch(err => {
        console.error('Error fetching user orders:', err);
      });
  };
  
  // Handle order details fetching
  const handleFetchOrderDetails = () => {
    fetchOrderDetails(selectedOrderId)
      .catch(err => {
        console.error('Error fetching order details:', err);
      });
  };
  
  // Handle product search
  const handleSearch = (e) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) {
      return;
    }
    
    searchForProducts(searchQuery)
      .catch(err => {
        console.error('Error searching products:', err);
      });
  };
  
  // Handle checkout
  const handleCheckout = () => {
    if (cart.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    checkout(userData)
      .then(result => {
        setCheckoutResult(result);
        setTimeout(() => setCheckoutResult(null), 5000); // Clear after 5 seconds
      })
      .catch(err => {
        console.error('Checkout failed:', err);
      });
  };
  
  // Demo of Promise.all
  const handlePromiseAll = () => {
    // Start a timer to measure execution time
    const startTime = performance.now();
    
    // Run multiple API calls in parallel
    Promise.all([
      fetchProducts(),
      fetchOrders(),
      fetchUserOrders(1)
    ])
      .then(([productsResult, ordersResult, userOrdersResult]) => {
        const endTime = performance.now();
        setPromiseChainResult({
          method: 'Promise.all',
          time: endTime - startTime,
          productsCount: productsResult.length,
          ordersCount: ordersResult.length,
          userOrdersCount: userOrdersResult.length
        });
      })
      .catch(err => {
        console.error('Promise.all failed:', err);
      });
  };
  
  // Demo of Promise chain
  const handlePromiseChain = () => {
    // Start a timer to measure execution time
    const startTime = performance.now();
    
    // Run API calls sequentially
    fetchProducts()
      .then(productsResult => {
        return fetchOrders().then(ordersResult => {
          return fetchUserOrders(1).then(userOrdersResult => {
            return {
              productsResult,
              ordersResult,
              userOrdersResult
            };
          });
        });
      })
      .then(results => {
        const endTime = performance.now();
        setPromiseChainResult({
          method: 'Promise chain',
          time: endTime - startTime,
          productsCount: results.productsResult.length,
          ordersCount: results.ordersResult.length,
          userOrdersCount: results.userOrdersResult.length
        });
      })
      .catch(err => {
        console.error('Promise chain failed:', err);
      });
  };
  
  // Demo of unreliable operation
  const handleUnreliable = () => {
    tryUnreliableOperation()
      .then(result => {
        alert(`Success: ${result.message}`);
      })
      .catch(err => {
        // Error is already set in store
        console.error('Unreliable operation failed:', err);
      });
  };
  
  // Render helper functions for each tab
  const renderBasicPromises = () => (
    <div>
      <p>This section demonstrates basic Promise usage with then/catch for handling API calls.</p>
      
      <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
        <div style={{ flex: 1 }}>
          <h4>Products ({products.length})</h4>
          <ul style={{ padding: '0 0 0 20px', maxHeight: '300px', overflowY: 'auto' }}>
            {products.map(product => (
              <li key={product.id} style={{ marginBottom: '8px' }}>
                <div>
                  <strong>{product.name}</strong> - ${product.price}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {product.category} | Stock: {product.stock}
                </div>
                <Button 
                  onClick={() => addToCart(product)} 
                  size="small" 
                  variant="primary"
                  style={{ marginTop: '4px' }}
                >
                  Add to Cart
                </Button>
              </li>
            ))}
          </ul>
        </div>
        
        <div style={{ flex: 1 }}>
          <h4>Orders ({orders.length})</h4>
          <ul style={{ padding: '0 0 0 20px', maxHeight: '300px', overflowY: 'auto' }}>
            {orders.map(order => (
              <li key={order.id} style={{ marginBottom: '8px' }}>
                <div>
                  <strong>Order #{order.id}</strong> - ${order.total}
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  Status: {order.status} | Products: {order.products.length}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h4>Fetch Orders by User</h4>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <select
            value={selectedUserId}
            onChange={(e) => setSelectedUserId(Number(e.target.value))}
            style={{ padding: '8px', marginRight: '10px' }}
          >
            <option value={1}>Alice</option>
            <option value={2}>Bob</option>
            <option value={3}>Charlie</option>
          </select>
          
          <Button onClick={handleFetchUserOrders}>
            Fetch User Orders
          </Button>
        </div>
        
        {userOrders.length > 0 && (
          <div>
            <h5>User Orders:</h5>
            <ul style={{ padding: '0 0 0 20px' }}>
              {userOrders.map(order => (
                <li key={order.id}>
                  Order #{order.id}: ${order.total} ({order.status})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
  
  const renderPromiseChaining = () => (
    <div>
      <p>This section demonstrates Promise chaining to handle dependent operations.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <h4>Order Details</h4>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <select
            value={selectedOrderId}
            onChange={(e) => setSelectedOrderId(Number(e.target.value))}
            style={{ padding: '8px', marginRight: '10px' }}
          >
            {orders.map(order => (
              <option key={order.id} value={order.id}>
                Order #{order.id}
              </option>
            ))}
          </select>
          
          <Button onClick={handleFetchOrderDetails}>
            View Order Details
          </Button>
        </div>
        
        {orderDetails && (
          <div style={{ 
            padding: '15px', 
            border: '1px solid #ddd', 
            borderRadius: '4px',
            backgroundColor: '#f9f9f9'
          }}>
            <h5>Order #{orderDetails.id}</h5>
            <p><strong>Customer:</strong> {orderDetails.user.name} ({orderDetails.user.email})</p>
            <p><strong>Total:</strong> ${orderDetails.total}</p>
            <p><strong>Status:</strong> {orderDetails.status}</p>
            
            <h6>Products:</h6>
            <ul style={{ padding: '0 0 0 20px' }}>
              {orderDetails.products.map(product => (
                <li key={product.id}>
                  {product.name} - ${product.price}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <h4>Search Products</h4>
        <form onSubmit={handleSearch} style={{ marginBottom: '15px' }}>
          <div style={{ display: 'flex' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name or category..."
              style={{ 
                padding: '8px',
                flex: 1,
                marginRight: '10px',
                borderRadius: '4px',
                border: '1px solid #ddd'
              }}
            />
            
            <Button type="submit">Search</Button>
          </div>
        </form>
        
        {searchResults.length > 0 && (
          <div>
            <h5>Search Results ({searchResults.length}):</h5>
            <ul style={{ padding: '0 0 0 20px' }}>
              {searchResults.map(product => (
                <li key={product.id} style={{ marginBottom: '8px' }}>
                  <div>
                    <strong>{product.name}</strong> - ${product.price}
                  </div>
                  <div style={{ fontSize: '14px', color: '#666' }}>
                    {product.category} | Stock: {product.stock}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
  
  const renderPromiseMethods = () => (
    <div>
      <p>This section demonstrates advanced Promise methods like Promise.all to run operations in parallel.</p>
      
      <div style={{ display: 'flex', gap: '15px', marginBottom: '25px' }}>
        <Button onClick={handlePromiseAll} variant="primary">
          Run with Promise.all
        </Button>
        
        <Button onClick={handlePromiseChain} variant="secondary">
          Run with Promise Chain
        </Button>
      </div>
      
      {promiseChainResult && (
        <div style={{ 
          padding: '15px', 
          marginBottom: '25px',
          backgroundColor: '#f5f5f5', 
          borderRadius: '4px',
          border: '1px solid #ddd'
        }}>
          <h5>Performance Results</h5>
          <p><strong>Method:</strong> {promiseChainResult.method}</p>
          <p><strong>Execution Time:</strong> {promiseChainResult.time.toFixed(2)}ms</p>
          <p><strong>Data Retrieved:</strong> {promiseChainResult.productsCount} products, {promiseChainResult.ordersCount} orders, {promiseChainResult.userOrdersCount} user orders</p>
        </div>
      )}
      
      <div style={{ marginTop: '30px' }}>
        <h4>Error Handling Demo</h4>
        <p>This button triggers a Promise that randomly succeeds or fails (40% failure rate).</p>
        
        <div style={{ marginBottom: '15px' }}>
          <Button onClick={handleUnreliable} variant="danger" style={{ marginRight: '10px' }}>
            Try Unreliable Operation
          </Button>
          
          <Button onClick={resetError} variant="secondary">
            Reset Error
          </Button>
        </div>
        
        <p style={{ fontSize: '14px' }}>
          The then() method is called when the Promise resolves successfully, and catch() is called when it rejects.
        </p>
      </div>
    </div>
  );
  
  const renderShoppingCart = () => (
    <div>
      <p>This demo shows a shopping cart implementation using Promises for the checkout process.</p>
      
      <div style={{ display: 'flex', gap: '30px' }}>
        <div style={{ flex: 1 }}>
          <h4>Shopping Cart</h4>
          
          {cart.length === 0 ? (
            <p>Your cart is empty. Add some products from the Basic Demo tab.</p>
          ) : (
            <>
              <ul style={{ 
                padding: '0',
                listStyle: 'none', 
                marginBottom: '15px',
                maxHeight: '300px',
                overflowY: 'auto'
              }}>
                {cart.map(item => (
                  <li key={item.productId} style={{ 
                    padding: '10px',
                    borderBottom: '1px solid #eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div>
                      <div><strong>{item.name}</strong></div>
                      <div>${item.price} × {item.quantity}</div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <button 
                        onClick={() => updateCartItemQuantity(item.productId, item.quantity - 1)} 
                        style={{ 
                          padding: '2px 8px',
                          background: '#f1f1f1',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          marginRight: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        -
                      </button>
                      
                      <span style={{ margin: '0 5px' }}>{item.quantity}</span>
                      
                      <button 
                        onClick={() => updateCartItemQuantity(item.productId, item.quantity + 1)} 
                        style={{ 
                          padding: '2px 8px',
                          background: '#f1f1f1',
                          border: '1px solid #ddd',
                          borderRadius: '4px',
                          marginRight: '10px',
                          cursor: 'pointer'
                        }}
                      >
                        +
                      </button>
                      
                      <button 
                        onClick={() => removeFromCart(item.productId)} 
                        style={{ 
                          padding: '3px 8px',
                          background: '#ffeeee',
                          border: '1px solid #ffcccc',
                          borderRadius: '4px',
                          color: '#cc0000',
                          cursor: 'pointer'
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                borderTop: '1px solid #ddd',
                paddingTop: '15px',
                marginBottom: '20px'
              }}>
                <div>
                  <strong>Total:</strong>
                </div>
                <div>
                  <strong>${cartTotal.toFixed(2)}</strong>
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '10px' }}>
                <Button 
                  onClick={clearCart} 
                  variant="secondary"
                >
                  Clear Cart
                </Button>
                
                <Button 
                  onClick={handleCheckout} 
                  variant="success"
                  disabled={cart.length === 0}
                >
                  Checkout
                </Button>
              </div>
              
              {checkoutResult && (
                <div style={{ 
                  marginTop: '20px',
                  padding: '15px',
                  backgroundColor: '#eeffee',
                  border: '1px solid #ccffcc',
                  borderRadius: '4px',
                  color: '#006600'
                }}>
                  <p><strong>{checkoutResult.message}</strong></p>
                  <p>Order #{checkoutResult.order.id} has been placed.</p>
                  <p>Total: ${checkoutResult.order.total}</p>
                </div>
              )}
            </>
          )}
        </div>
        
        <div style={{ flex: 1 }}>
          <h4>User Information</h4>
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Name:</label>
            <input
              type="text"
              value={userData.name}
              onChange={(e) => setUserData({ ...userData, name: e.target.value })}
              style={{ 
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
          
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Email:</label>
            <input
              type="email"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
              style={{ 
                width: '100%',
                padding: '8px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <h1>JavaScript Promises in React</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid #eee' }}>
          <button 
            onClick={() => setSelectedTab('basic')}
            style={{
              padding: '10px 15px',
              background: selectedTab === 'basic' ? '#f5f5f5' : 'transparent',
              border: 'none',
              borderBottom: selectedTab === 'basic' ? '2px solid #3498db' : 'none',
              cursor: 'pointer'
            }}
          >
            Basic Promises
          </button>
          <button 
            onClick={() => setSelectedTab('chaining')}
            style={{
              padding: '10px 15px',
              background: selectedTab === 'chaining' ? '#f5f5f5' : 'transparent',
              border: 'none',
              borderBottom: selectedTab === 'chaining' ? '2px solid #3498db' : 'none',
              cursor: 'pointer'
            }}
          >
            Promise Chaining
          </button>
          <button 
            onClick={() => setSelectedTab('methods')}
            style={{
              padding: '10px 15px',
              background: selectedTab === 'methods' ? '#f5f5f5' : 'transparent',
              border: 'none',
              borderBottom: selectedTab === 'methods' ? '2px solid #3498db' : 'none',
              cursor: 'pointer'
            }}
          >
            Promise Methods
          </button>
          <button 
            onClick={() => setSelectedTab('cart')}
            style={{
              padding: '10px 15px',
              background: selectedTab === 'cart' ? '#f5f5f5' : 'transparent',
              border: 'none',
              borderBottom: selectedTab === 'cart' ? '2px solid #3498db' : 'none',
              cursor: 'pointer'
            }}
          >
            Shopping Cart
          </button>
        </div>
      </div>
      
      <Card
        title={
          selectedTab === 'basic' ? 'Basic Promise Usage' :
          selectedTab === 'chaining' ? 'Promise Chaining' :
          selectedTab === 'methods' ? 'Advanced Promise Methods' :
          'Shopping Cart with Promises'
        }
        isLoading={isLoading}
        error={error}
        footerContent={
          <div>
            <p style={{ color: '#666', fontSize: '14px' }}>
              Promises represent the eventual completion (or failure) of an asynchronous operation.
            </p>
          </div>
        }
      >
        {selectedTab === 'basic' && renderBasicPromises()}
        {selectedTab === 'chaining' && renderPromiseChaining()}
        {selectedTab === 'methods' && renderPromiseMethods()}
        {selectedTab === 'cart' && renderShoppingCart()}
      </Card>
      
      <Card title="How Promises Work">
        <div style={{ lineHeight: '1.6' }}>
          <p>
            A <strong>Promise</strong> is an object that represents the eventual completion or failure 
            of an asynchronous operation. It has three states:
          </p>
          
          <ul>
            <li><strong>Pending:</strong> Initial state, neither fulfilled nor rejected</li>
            <li><strong>Fulfilled:</strong> The operation completed successfully</li>
            <li><strong>Rejected:</strong> The operation failed</li>
          </ul>
          
          <h4>Promise Methods:</h4>
          <ul>
            <li><strong>then():</strong> Called when a Promise is resolved successfully</li>
            <li><strong>catch():</strong> Called when a Promise is rejected (errors)</li>
            <li><strong>finally():</strong> Called regardless of success or failure</li>
            <li><strong>Promise.all():</strong> Wait for all Promises to resolve in parallel</li>
            <li><strong>Promise.race():</strong> Wait for the first Promise to resolve or reject</li>
            <li><strong>Promise.allSettled():</strong> Wait for all Promises to settle (resolve or reject)</li>
          </ul>
          
          <h4>Promise vs Async/Await:</h4>
          <p>Async/await is syntactic sugar built on top of Promises that makes async code easier to read and write. Behind the scenes, it still uses Promises.</p>
          
          <ul>
            <li>
              <strong>Promise Syntax:</strong> <code>fetchData().then(data =&gt; console.log(data)).catch(err =&gt; console.error(err))</code>
            </li>
            <li>
              <strong>Async/Await Syntax:</strong> <code>try &#123; const data = await fetchData(); console.log(data); &#125; catch(err) &#123; console.error(err) &#125;</code>
            </li>
          </ul>
        </div>
      </Card>
    </div>
  );
};

export default PromisesDemo; 