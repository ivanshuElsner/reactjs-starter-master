import React from "react";
import { CountryData } from "../interfaces/CountryData";

const CountryList: React.FC<Props> = ({ countryListArr, selectCountry }) => {
  return (
    <div className="CountryForm">
      <select name="selectCountryList" defaultValue="none" onChange={selectCountry}>
        <option disabled value="none">
          Please select country
        </option>
        {countryListArr?.map((value, index) => (
          <option key={index} value={index}>
            {value.name}
          </option>
        ))}
      </select>
    </div>
  );
};

type Props = {
  countryListArr: Array<CountryData> | null;
  selectCountry: React.ChangeEventHandler<HTMLSelectElement>;
};

export default CountryList;
