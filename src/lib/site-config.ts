export const siteConfig = {
  name: 'Dantved',
  tagline: 'Clinic',
  bookingUrl: import.meta.env.VITE_BOOKING_URL ?? 'https://dentflow.app/book',
  whatsappUrl:
    import.meta.env.VITE_WHATSAPP_URL ??
    'https://wa.me/918010855436?text=Hello%2C%20I%27d%20like%20to%20book%20a%20consultation%20at%20Dantved%20Clinic.',
  phone: '+91 80108 55436',
  email: 'info@dantved.clinic',
  address: {
    line1: 'Row House 5, Bramha Suncity',
    line2: 'Wadgaon Sheri, Pune 411014'
  },
  mapsUrl: 'https://maps.app.goo.gl/NUwwU9b9vDLZLJyQ7',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3782.3828941724395!2d73.91892809999999!3d18.5573215!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c147b311ef3b%3A0x633bcad2c8c4a4f8!2sDantved%20Clinic!5e0!3m2!1sen!2sin!4v1716128000000'
} as const;
