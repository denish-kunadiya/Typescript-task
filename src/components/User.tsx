import React, { useState } from 'react'
import { connect } from 'react-redux';
import { RootState } from '../redux/reducer';
import { Button, Container, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import { countries } from './data';


  interface Props {
    setSelectedCountryId:React.Dispatch<React.SetStateAction<string | number | null>>
    userListFromRedux:{
      id: string
      mobile: string
      primary: string
      shortName: string
    }[]
    addCountryAndMobile:()=>void
    selectedCountryId:any
    setMobileNo:React.Dispatch<React.SetStateAction<string>>
    mobileNo:string
  }

const User:React.FC<Props> = ({addCountryAndMobile,selectedCountryId,setSelectedCountryId,setMobileNo,mobileNo}) => {


  const [CountryList, setCountryList] = useState(countries);
  const [search, setSearch] = useState("");


  const onFIlterCountry = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
    const filter = countries.filter((country) =>
      country.primary.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setCountryList(filter);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    var x: any = e.target.value
      .replace(/\D/g, "")
      .match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
    e.target.value = !x[2]
      ? x[1]
      : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      setMobileNo(!x[2]
        ? x[1]
        : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : ""));
  };
 
 
  return (
    <div style={{padding:"3rem"}}>
    <Container className="mt-4">
      <div className="d-flex justify-content-start flex-wrap">
        <div className='mb-2'>
          <DropdownButton
            id="dropdown-item-button"
            title={selectedCountryId}
            className="mx-3"
            onSelect={function (evt) {
              console.log(evt);
              setSelectedCountryId(evt);
            }}
            onClick={() => {
              setCountryList(countries);
              setSearch("");
            }}
          >
            <Dropdown.ItemText>
              <input
                type="text"
                onChange={(e) => onFIlterCountry(e)}
                defaultValue={search}
                placeholder='Search Country'
                style={{width:"100%"}}
              />
            </Dropdown.ItemText>

            {CountryList.map((country, index) => (
              <Dropdown.Item
                as="button"
                eventKey={country.shortName + " - " + country.primary}
                key={index}
              >
                {country.primary}({country.shortName}) {"   "}{" "}
                {/* {country.secondary} */}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </div>

        <div>
          <InputGroup className="mb-3">
            <Form.Control
              placeholder="(000) 000-0000"
              aria-label="Username"
              aria-describedby="basic-addon1"
              onChange={(e) => handleChange(e as any)}
              value={mobileNo}
              defaultValue={mobileNo}
            />
          </InputGroup>
        </div>
      </div>
      <Button variant="primary" onClick={addCountryAndMobile}>
        Submit
      </Button>
    </Container>
    </div>
  )
}


const mapStateToProps = (state: RootState) => {
  return {
    userListFromRedux: state?.countriesData?.user
  };
};

export default connect(mapStateToProps)(User)