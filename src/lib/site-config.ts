export const siteConfig = {
  name: 'DANTVED',
  tagline: 'CLINIC',
  bookingUrl: 'https://appointment.docplix.com/doctor/dpx5952',
  whatsappUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ??
    'https://wa.me/918143789587?text=Hello%2C%20I%27d%20like%20to%20book%20a%20consultation%20at%20DANTVED%20CLINIC.',
  phone: '+91 81437 89587',
  email: 'dantvedclinic@gmail.com',
  instagramUrl: 'https://www.instagram.com/dr.siddharth_vaish/',
  address: {
    line1: 'Shop No. 18, Bhoomi Colossa',
    line2: 'Sector-19, Airoli, Navi Mumbai 400708'
  },
  mapsUrl: 'https://maps.app.goo.gl/izYktGAfEKpwv95A8',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.791602575586!2d72.9921395!3d19.160597399999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b91e65dd2cb7%3A0xd2cc2d6a677ce2e3!2sDANTVED%20CLINIC!5e0!3m2!1sen!2sin!4v1783436334729!5m2!1sen!2sin',
  openingHours: {
    weekdays: '10:00 AM – 3:00 PM · 4:00 PM – 9:30 PM',
    sunday: '10:00 AM – 2:00 PM'
  }
} as const;
