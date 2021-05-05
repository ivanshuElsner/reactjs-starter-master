import React, { useState } from "react";
import "./home.css";
import Service from "../../service";
import CountryForm from "../../components/countryForm";
import CountryList from "../../components/countryList";
import Capital from "../../components/capital";
import { CountryData } from "../../interfaces/CountryData";
import { CapitalData } from "../../interfaces/CapitalData";
import { connect, ConnectedProps } from 'react-redux'
import { isLoadingHandler } from '../../redux/action'

const Home: React.FC<Props> = ({
  isLoadingHandler
}) => {
  const [step, setStep] = useState<number>(0);
  const [countryName, setCountryName] = useState<string | null>(null);
  const [countryListArr, setCountryListArr] = useState<Array<CountryData>>([]);
  const [selectedCountry, setSelectedCountry] = useState<CountryData | null>(
    null
  );
  const [capitalData, setCapitalData] = useState<CapitalData | null>(null);

  const handleCountryOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountryName(e.target.value);
  };

  const updateCountryList = (data: Array<any>) => {
    setCountryListArr(data);
    setStep(1);
  };

  const selectCountry = (e: any) => {
    setSelectedCountry(countryListArr[e.target.value]);
    setStep(2);
  };

  const showCountryCapital = async () => {
    const api_url = Service.weatherstackAPI;
    const params = `access_key=${Service.weatherstackAPIKey}&query=${selectedCountry?.capital}`;
    isLoadingHandler(true)
    const response = await Service.makeAPICall(
      Service.getMethod,
      api_url,
      params
    );
    isLoadingHandler(false)
    if (!response) {
      return console.log(Service.error_message);
    }
    if (response.data && response.data.current) {
      setCapitalData(response.data.current);
    }
  };

  return (
    <div className="Home">
      {step === 2 ? (
        <>
          {selectedCountry && (
            <Capital
              selectedCountry={selectedCountry}
              capitalData={capitalData}
              showCountryCapital={showCountryCapital}
            />
          )}
        </>
      ) : step === 1 ? (
        <>
          <CountryList
            countryListArr={countryListArr}
            selectCountry={selectCountry}
          />
        </>
      ) : (
        <CountryForm
          countryName={countryName}
          handleCountryOnChange={handleCountryOnChange}
          updateCountryList={updateCountryList}
        />
      )}
    </div>
  );
}

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    isLoadingHandler: (value: any) => dispatch(isLoadingHandler(value)),
  }
}

const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
};

export default connector(Home);
