interface IFrameMapsProps {
  className?: string;
}

function IFrameMaps({ className }: IFrameMapsProps) {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d131562.4325358388!2d13.796343178312013!3d44.93582524399598!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x477ccc6b9b699605%3A0x1c1a95c55cfc8475!2sAntonio%20Smareglia%2050%2C%2052100%2C%20Vodnjan!5e0!3m2!1shr!2shr!4v1732739039363!5m2!1shr!2shr"
      className={`w-full h-full ${className}`}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
}

export default IFrameMaps;
