import React, { useEffect, useRef } from 'react';

interface IProps {
  center: google.maps.LatLngLiteral;
  zoom: number;
}

export const GoogleMap = ({ center, zoom }: IProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      new window.google.maps.Map(ref.current, {
        center,
        zoom
      });
    }
  });

  return <div ref={ref} id='map' style={{ height: '100%' }} />;
};
