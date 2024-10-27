import {
  Avatar,
  Button,
  Flex,
  Input,
  Radio,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import AccountServices from "../../services/AccountServices";
import ProvinceServices from "../../services/ProvinceServices";

const InfoItem = styled(Flex)`
  gap: 1rem;
`;

const Label = styled(Typography.Text)`
  margin-right: 1rem;
  font-size: 1rem;
  flex: 1;
`;

const InputContainer = styled(Space)`
  flex: 5;

  div {
    width: 100%;
  }
`;

const Form = styled(Flex)`
  width: 50vw;
  margin-top: 2rem;
`;

function UpdateAccountPage() {
  const [info, setInfo] = React.useState({
    fullName: "",
    email: "",
    gender: 0,
    provinceId: 0,
    errorMessage: "",
  });
  const [provinces, setProvinces] = React.useState([]);

  const navigate = useNavigate();

  const handleUpdateAccount = async () => {
    try {
      await AccountServices.updateAccount(
        info.fullName,
        info.provinceId,
        info.gender
      );

      navigate("/");
    } catch (error) {
      console.log(error);
      setInfo((prev) => {
        return {
          ...prev,
          errorMessage: "Update failed",
        };
      });
    }
  };

  useEffect(() => {
    const getInfoResponse = AccountServices.getAccountInfo();
    const getPronviceResponse = ProvinceServices.getProvinces();

    Promise.all([getInfoResponse, getPronviceResponse]).then((values) => {
      const infoResponse = values[0];
      const provinceResponse = values[1];
      setInfo(infoResponse.data);
      setProvinces(provinceResponse.data.body);
    });
  }, []);
  return (
    <Flex vertical align="center">
      <Avatar
        style={{
          width: "75px",
          height: "75px",
        }}
        size={"large"}
      >
        MT
      </Avatar>

      <Form vertical gap={"1rem"}>
        {info.errorMessage && (
          <Typography.Text type="danger">{info.errorMessage}</Typography.Text>
        )}
        <InfoItem>
          <Label>Full Name</Label>
          <InputContainer>
            <Input value={info.fullName} onChange={(e) => console.log(e)} />
          </InputContainer>
        </InfoItem>

        <InfoItem>
          <Label>Email</Label>
          <InputContainer>
            <Input
              disabled
              value={info.email}
              onChange={(e) => console.log(e)}
            />
          </InputContainer>
        </InfoItem>

        <InfoItem>
          <Label>Gender</Label>
          <InputContainer>
            <Radio.Group
              value={info.gender}
              onChange={(e) =>
                setInfo((prev) => {
                  return {
                    ...prev,
                    gender: e.target.value,
                  };
                })
              }
            >
              <Space direction="horizontal">
                <Radio value={"MALE"}>Male</Radio>
                <Radio value={"FEMALE"}>Female</Radio>
              </Space>
            </Radio.Group>
          </InputContainer>
        </InfoItem>

        <InfoItem>
          <Label>Province</Label>

          <InputContainer>
            <Select
              showSearch
              placeholder="Select a province"
              optionFilterProp="label"
              onChange={(e) => {
                setInfo((prev) => {
                  return {
                    ...prev,
                    provinceId: e,
                  };
                });
              }}
              value={info.provinceId}
              onSearch={(e) => console.log(e)}
              options={provinces?.map((province: any) => {
                return {
                  value: province.provinceId,
                  label: province.provinceName,
                };
              })}
            />
          </InputContainer>
        </InfoItem>

        <Button type="primary" onClick={handleUpdateAccount}>
          Update
        </Button>
      </Form>
    </Flex>
  );
}

export default UpdateAccountPage;
