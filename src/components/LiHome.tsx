import React from 'react';
import Link from 'next/link';

// Definir la interfaz para las props
interface LiHomeProps {
  text: string;
  url: string;
}

// Usar React.FC para tipar el componente
const LiHome: React.FC<LiHomeProps> = ({ text, url }) => {
  return (
    <li>
      <Link href={url}>{text}</Link>
    </li>
  );
};

export default LiHome;