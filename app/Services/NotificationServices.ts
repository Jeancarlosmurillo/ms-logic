import axios from 'axios';
import { DateTime } from 'luxon';


class NotificationService {
    public static async new_contract(recipient: string, description:string, date:DateTime, customer:string): Promise<void> {
        const notificationUrl = process.env.notification_service_url ;
        const emailData = {
            recipient, // Dirección de correo electrónico
            description,
            date,
            customer
        };

        try {
            await axios.post(`${notificationUrl}contract`, emailData);
            console.log('Correo enviado correctamente');
        } catch (error) {
            console.error('Error al enviar el correo:', error.message);
            throw new Error('Failed to send notification'); // Lanza un error si falla
        }
    }
    public static async send_order(recipient: string, rutaid: number, contractid: number, date_order: Date, type: string, address: string, municipality: string, departament: string): Promise<void> {
        const notificationUrl = process.env.notification_service_url ;
        const emailData = {
            recipient, // Dirección de correo electrónico
            rutaid,
            contractid,
            date_order,
            type,
            address,
            municipality,
            departament
        };
        try {
            await axios.post(`${notificationUrl}order`, emailData);
            console.log('Correo enviado correctamente');
        } catch (error) {
            console.error('Error al enviar el correo:', error.message);
            throw new Error('Failed to send notification'); // Lanza un error si falla
        }
    }
    public static async send_tranch(recipient: string, routeid: number, start_date: Date, end_date: Date, origin: string, destination: string): Promise<void> {
        const notificationUrl = process.env.notification_service_url ;
        const emailData = {
            recipient, // Dirección de correo electrónico
            routeid,
            start_date,
            end_date,
            origin,
            destination
        };
        try {
            await axios.post(`${notificationUrl}tranch`, emailData);
            console.log('Correo enviado correctamente');
        } catch (error) {
            console.error('Error al enviar el correo:', error.message);
            throw new Error('Failed to send notification'); // Lanza un error si falla
        }
    }

}


export default NotificationService;
