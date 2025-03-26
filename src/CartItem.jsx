/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateItemQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state) => state.cart.items);

    const handleRemoveItem = (name) => {
        dispatch(removeItem({ name }));
    };

    const handleIncrement = (name, quantity) => {
        dispatch(updateItemQuantity({ name, quantity: quantity + 1 }));
    };

    const handleDecrement = (name, quantity) => {
        if (quantity > 1) {
            dispatch(updateItemQuantity({ name, quantity: quantity - 1 }));
        } else {
            dispatch(removeItem({ name }));
        }
    };

    const calculateSubtotal = (item) => {
        const cost = parseFloat(item.cost.substring(1)); // Convert price string to number
        return cost * item.quantity;
    };

    const calculateTotal = () => {
        let total = 0;
        cartItems.forEach((item) => {
            total += calculateSubtotal(item);
        });
        return total.toFixed(2); // Return the total sum rounded to 2 decimal places
    };

    const calculateTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    const handleContinueShopping = (e) => {
        e.preventDefault();
        onContinueShopping(e);
    };

    const handleCheckoutShopping = (e) => {
        e.preventDefault();
        alert('Checkout functionality will be added at a later date.');
    };

    return (
        <div className="cart-container">
            <h2>Cart Items</h2>
            <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item.name} className="cart-item">
                    <div className="cart-item-name">{item.name}</div>
                    <img src={item.image} alt={item.name} className="cart-item-image"/>
                    <div className="cart-item-cost">{item.cost}</div>
                    <div className="cart-item-quantity">
                          <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item.name, item.quantity)}>-</button>
                          <span className="cart-item-quantity-value">{item.quantity}</span>
                          <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item.name, item.quantity)}>+</button>
                    </div>
                    <div className="cart-item-total">Subtotal: ${calculateSubtotal(item).toFixed(2)}</div>
                    <button className="cart-item-delete" onClick={() => handleRemoveItem(item.name)}>Remove</button>
                  </li>
                ))}
            </ul>
            <div className="cart-total">Total: ${calculateTotal()}</div>
            <div className="cart-total">Total Items: {calculateTotalItems()}</div>
            <div className="cart-buttons">
                <button className="continue-shopping-btn" onClick={handleContinueShopping}>Continue Shopping</button>
                <button className="checkout-btn" onClick={handleCheckoutShopping}>Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;