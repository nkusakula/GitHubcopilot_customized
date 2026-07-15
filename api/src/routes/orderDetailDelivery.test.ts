import { describe, it, expect, beforeEach } from 'vitest';
import request from 'supertest';
import express from 'express';
import orderDetailDeliveryRouter, { resetOrderDetailDeliveries } from './orderDetailDelivery';
import { orderDetailDeliveries as seedOrderDetailDeliveries } from '../seedData';

let app: express.Express;

describe('OrderDetailDelivery API', () => {
    beforeEach(() => {
        app = express();
        app.use(express.json());
        app.use('/order-detail-deliveries', orderDetailDeliveryRouter);
        resetOrderDetailDeliveries();
    });

    it('should create a new order detail delivery', async () => {
        const newItem = {
            orderDetailDeliveryId: 100,
            orderDetailId: 1,
            deliveryId: 1,
            quantity: 3,
            notes: "Test delivery"
        };
        const response = await request(app).post('/order-detail-deliveries').send(newItem);
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newItem);
    });

    it('should get all order detail deliveries', async () => {
        const response = await request(app).get('/order-detail-deliveries');
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(seedOrderDetailDeliveries.length);
    });

    it('should get an order detail delivery by ID', async () => {
        const response = await request(app).get('/order-detail-deliveries/1');
        expect(response.status).toBe(200);
        expect(response.body).toEqual(seedOrderDetailDeliveries[0]);
    });

    it('should update an order detail delivery by ID', async () => {
        const updatedItem = { ...seedOrderDetailDeliveries[0], quantity: 10 };
        const response = await request(app).put('/order-detail-deliveries/1').send(updatedItem);
        expect(response.status).toBe(200);
        expect(response.body).toEqual(updatedItem);
    });

    it('should delete an order detail delivery by ID', async () => {
        const response = await request(app).delete('/order-detail-deliveries/1');
        expect(response.status).toBe(204);
    });

    it('should return 404 for non-existing order detail delivery', async () => {
        const response = await request(app).get('/order-detail-deliveries/999');
        expect(response.status).toBe(404);
    });
});
