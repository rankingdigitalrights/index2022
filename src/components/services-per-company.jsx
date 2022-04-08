import React from "react";
import Icon from "../images/icons/e-commerce.svg"

const ServicesByCompany = ({ companies, category, axis }) => {

  // companies [
  //   { id: 'Alibaba', 
  //     name: 'Alibaba', 
  //     services: [
  //        {
  //          id: 'Taobao.com',
  //          kind: 'eCommerce',
  //          kindName: 'eCommerce',
  //          name: 'Taobao.com',
  //          categoryScore: { freedom: 28, governance: 13, privacy: 43, total: 34 }
  //        },
  //        {
  //          id: 'AliGenie',
  //          kind: 'pda',
  //          kindName: 'Virtual assistant',
  //          name: 'AliGenie',
  //          categoryScore: { freedom: 11, governance: 9, privacy: 31, total: 21 }
  //         }
  //       ]
  //    }
  //  .....
  // ]

  const companyBlock = (companies, category) => {
    companies.forEach(company => {
      console.log('Company:', company.name)
      company.services.forEach(service => {
        console.log(service.name, category, service.categoryScore[category])
      })
    })
  }


  return (
    <div>

      <h1>Services-By-Company Chart</h1>

    </div>
  );
}


export default ServicesByCompany;
