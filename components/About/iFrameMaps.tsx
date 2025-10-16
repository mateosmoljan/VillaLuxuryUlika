interface IFrameMapsProps {
  className?: string;
}

function IFrameMaps({ className }: IFrameMapsProps) {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d16435.947786585937!2d13.839596788062426!3d44.96848767918781!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477ccd000dcb5319%3A0xe7c4d6e6a8383a2f!2sVilla%20Cesarica!5e0!3m2!1sen!2shr!4v1760607190332!5m2!1sen!2shr"
      className={`w-full h-full ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}

export default IFrameMaps;
