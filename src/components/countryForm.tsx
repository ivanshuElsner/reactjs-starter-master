import React from "react";
import Service from "../service";
import { connect, ConnectedProps } from 'react-redux'
import { isLoadingHandler } from '../redux/action'

const CountryForm: React.FC<Props> = ({countryName, handleCountryOnChange, updateCountryList, isLoadingHandler}) => {
  const onSubmitCountryForm = async (e: React.FormEvent<EventTarget>) => {
    e.preventDefault();
    let api_url = `${Service.countryListAPI}/${countryName}`;
    isLoadingHandler(true)
    const response = await Service.makeAPICall(Service.getMethod, api_url);
    isLoadingHandler(false)
    if (!response) {
      return console.log(Service.error_message);
    }
    if (response.data && response.data.length > 0) {
        updateCountryList(response.data);
    }
  };

  return (
    <div className="CountryForm">
      <form name="countryForm" onSubmit={onSubmitCountryForm}>
        <input
          type="text"
          placeholder="Enter country"
          onChange={handleCountryOnChange}
        />
        <button type="submit" disabled={!countryName}>
          Submit
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch: (arg0: any) => any) => {
  return {
    isLoadingHandler: (value: any) => dispatch(isLoadingHandler(value)),
  }
}

const connector = connect(null, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>
type Props = PropsFromRedux & {
  countryName: string | null;
  handleCountryOnChange: React.ChangeEventHandler<HTMLInputElement>;
  updateCountryList: Function,
};

export default connector(CountryForm);
