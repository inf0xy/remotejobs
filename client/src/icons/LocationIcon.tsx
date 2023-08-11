import React from 'react';

type LocationIconProps = {
  width?: number;
  height?: number;
};

const LocationIcon: React.FC<LocationIconProps> = ({ width, height }) => {
  return (
    <img
      src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAElElEQVR4nO1ZXYhVVRTeI6N09vftc7pzHKfIh6CyghIVw5dAK6IfCjH6EX3qVVB6CTMV/KmHRHrTKAvqQYqiEiUI8yHCKMws+kEqCCWEsSIrzf+ZkXVbGw7XueecO2efmTviBwcu566zfvZae6291jbmKi5HX19fDGAZgB0kDwD4neR5efS3vHsNwNI0TZ3pNjjnbgXwBsnTJEdKPv8BeN05d4vpAliSW0leUOWGZdVJriW5UAwcGBiAPPJb3pFcR/IrpR1Rb20xxlwzIRbISpL8XpUZIrkzjuObyn4fx/HNJN/2BgH4wlp7vRlPWGvnasyLAj9Za+eNlVcURfMB/KwL8huA2Wa8POGNILk3SZJGVZ5xHPeR/MQbMx6esZlw2muM6Q3IeyrJfT7Mat0zurGb4RTCE6N5BsAvKmOjqQOadSQ7DVXZE0WIouguSQAATllrrwsuQOuEhNROUzNIvqNe2R68YksBk5Uqk2IBzACwmeQ3srLykDwEYBPJ/pKpfVi+6+/vZzBD5Nih3jhQREvycQD/tqvoAP4h+VgJPgeV/qmQhuxQRdYWGZEpcB9KJfeVHcAiALsyBXRJAa/1yufVYIbosUMUWFgQTk1POOeezeG1WhX8m+T0HH73KN2XIWzwTP9QBWfl0Gz2nijBb3dRinXOzdLFO25CgeQ5YZp39Cb5bZHXWldbEkA7mjRNndKcraJ7q5JnhGletQVwUmjKZBmvpIRiwSliRFoDEwokB4VpXoHy+6OMIZrOmxmsHU0URTeoIceq6N6q5GEVfEc7GqkZSrOoBL97Vcmv29FYa+cozQ9VdG8VvEeVfDKHZpPS7OqA34YcmuVK80EV3VuZvqhMX2hHIxVbi52s4uocujXK64RzLs2R+VKRsR1DPKEK7sujk4qtxU4U2C3ZSfaMPBJO3hNKs7hA5n6lXRzSkBkqXFKhLTBmiRa7dkeUE0XKJUlyrZ60LzQajSSYIargIc1cD5egnS7FTjazpGXNaAclTPLCyYPkE2r0fhMavnKTfDM488tlvV+018YMkrdlcn9ueFVBo9FItAAPJ0lyYy1CJFTUmOU1emOlyvi0LhliyIrMcKAO9AL4VWUsq0mGMZpGmxlJeuvQ/AEszRxLppo6QfJlXbH36gpdks+buiHDM78ZAdwZii+A+33DJXUkFN8iodtCe0U2N+ucZ42GKIpm+qkKybur8pPTgBrxZx2Dv1xIlc50eVMqsJqWGWKvMBOAiOQR7eWfHisTGVSoN34MPEse07xrULq+Tr/Xo38znVtrHzATiB4An6sxWzv9mORb6o09ZqJhrZ2rF54XnXMLOvjuQX+X2MlNV63ItLmHy9xr6BTlqH6zynQRppH8rqgd9gDwSqbfqJLxwkOnHhJiQ3mTFA0pqT9nSd5uuhH4vyuUuD8y2jFDW+bj6o1nTBejF8BnmTFOT+a/KSQ/VkM/avmv+xBF0Uw/9M5eQ2Ra5cFartTqgHPuUd0Hct/4kHPuEZ3CXARwn5lMgJ7FAPylIyDxxnNmEqKH5LuZeVbrnpk8SNPUyY2T9PhBLzXNFYxLmq52G8oV3+kAAAAASUVORK5CYII="
      width={width ? width : 24}
      height={height ? height : 24}
      alt="LocationIcon icon"
    />
  );
};

export default LocationIcon;