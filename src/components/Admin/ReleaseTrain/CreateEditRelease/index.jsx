import{ React, useState, useEffect} from 'react'
import { Container, 
    ContainerCentral,
    PositionTitle, 
    Form,
    H1,
    DivButton,
    ClickButton,
    PositionButtonCancel,
    DivBusinessName,
    Label,
    Input,
    DivCodeStatus,
    DivCode,
    DivStatus,
    DivSegment,
    DivAtivo   } from "./styles"
import { useReleaseContext } from '../../../../hook/useReleaseContent';
import ButtonDefault from '../../../../assets/Buttons/ButtonDefault';
import { TagComponent } from '../../../Geral/TagComponent';
import SingleSelect from '../../../Geral/Input/SingleSelect';
import {useFetchTag} from '../../../../hook/useFetchTag';
import { useFetchRelease } from '../../../../hook/useFetchRelease';
import { useBusinessContext } from '../../../../hook/useBusinessContent';


const CreateEditRelease = (props) => {
  const { setModalCreateRelease, setModalEditRelease ,loadData,modalDiscard,
    setModalDiscard,modalEditRelease,setIdRelease,idRelease} = useReleaseContext(); 
  const { business } = useBusinessContext();
  const { createRelease, updateRelease, updateStatusRelease} = useFetchRelease();
  const [flag, setFlag] = useState(false);
  const [releaseName, setReleaseName] = useState("");
  const [releaseCode, setReleaseCode] = useState("");
  const [releaseStatus, setReleaseStatus] = useState("");
  const [releaseId, setReleaseId] = useState("");
  const [tags, setTags] = useState("");
  const { tagList } = useFetchTag("Tag");
  const [businessRelease, setBusinessRelease] = useState("");
  const [newRelease,setNewRelease] = useState("");
  const [businessList,setBusinessList] = useState("");

  const status = [
    { id: 1, value: "Ativo", label: "Ativo" },
    { id: 2, value: "Inativo", label: "Inativo" },
  ];

  useEffect(() => {
    
    setBusinessList(
      business.map((item) => ({
        id: item.id,
        value: item.id,
        label: item.name,
      }))   
    );   

    if(props.title === "Edit Release"){
      setReleaseName(idRelease.name)
      setReleaseCode(idRelease.code)
      setReleaseStatus(idRelease.status)
      setBusinessRelease(idRelease.business)
      setTags(idRelease.Tag)
    }
  }, []);

  const handleSubmit = () => {
    if(!modalDiscard){
      if(!modalEditRelease){
        insertRelease()
      }
      else{
        editRelease()
      }
    }
  };

  const insertRelease = () =>{

    const newRelease = {
      release_name: releaseName,
      release_code: releaseCode,
      business_id: businessRelease,
      tags: tags.map((tag) => ({ tag_id: tag.value}))
    }

    if(releaseName, releaseCode, businessRelease){
      createRelease(newRelease);
      loadData()
      setModalCreateRelease(false)
    }
    else{
      setFlag(true);
    }
  }

  const editRelease = () => {
    const newRelease = {
      release_name: releaseName,
      release_code: releaseCode,
      status: releaseStatus,
      business_id: businessRelease,
      tags: tags.map((tag) => ({ tag_id: tag.value}))
    }
    if(releaseName, releaseCode, releaseStatus, businessRelease){
      updateRelease(newRelease,idRelease.id);
      if(newRelease.status != idRelease.status){
        updateStatusRelease(idRelease.id);
      }
      loadData()
      setModalEditRelease(false)
    }
    else{
      setFlag(true);
    }

  }

  const handleCancel = () => {
    setModalCreateRelease(false)
    setModalEditRelease(false)
  };

  const handleSelectRelease = (id) => {
    setReleaseStatus(id);
  };

  const handleSelectBusiness = (id) => {
    setBusinessRelease(id);
  };

  const handleChange = (id) => {
    //setBusinessStatus(id);
    console.log(id);
  };



  return (
    <ContainerCentral>
        <Container>
            <PositionTitle>
                <H1>{props.title}</H1>
            </PositionTitle>
            <Form>
            <DivBusinessName>

                <Label>Release Train Name</Label> 
                {/*!modalEditBusiness &&*/ (
                <Input
                  widthInput={"98% !important"}
                  name={releaseName}
                  flag={flag}
                  value={releaseName}
                  onChange={(event) => setReleaseName(event.target.value)}
                  required
                /> )}
            </DivBusinessName> 
            <DivCodeStatus>
                <DivCode>
                    <Label>Code</Label>
                    {(
                    <Input 
                      widthInput={"98% !important"}
                      name={releaseCode}
                      flag={flag}
                      value={releaseCode}
                      onChange={(event) => setReleaseCode(event.target.value)}
                      required
                    />
                    )}
                </DivCode>
                <DivStatus>
                    <Label>Status</Label>
                    {modalEditRelease && (
                        <SingleSelect
                        onChange={(event) => handleSelectRelease(event.value)}
                        set={(releaseStatus) => handleSelectRelease(releaseStatus)}
                        placeholder={flag && !releaseStatus ? "Required field" : ""}
                        options={status}
                        value={releaseStatus}
                        sizeSingle={"87%"}
                        sizeMenu={"100%"}
                        isDisabled={false}
                        required
                        />
                      )}
                      {!modalEditRelease && (
                        <>
                          <DivAtivo>
                            <Input placeholder="Status" value="Ativo" disabled />
                          </DivAtivo>
                        </>
                        )}
                </DivStatus>    
            </DivCodeStatus>
            <DivSegment>
                <Label>Business</Label>
                {!modalEditRelease && (
                  <SingleSelect
                  onChange={(s) => handleSelectBusiness(s)}
                  set={(s) => handleSelectBusiness(s)}
                  placeholder={flag && !businessRelease ? "Required field" : ""}
                  options={businessList ? businessList : []}
                  sizeSingle={"86.5%"}
                  sizeMenu={"100%"}
                  isDisabled={false}
                  required
                  />
                )}
                {modalEditRelease && (
                  <SingleSelect
                    onChange={(s) => handleSelectBusiness(s)}
                    set={(s) => handleSelectBusiness(s)}
                    placeholder={flag && !businessRelease ? "Required field" : ""}
                    options={businessList ? businessList : []}
                    sizeSingle={"86.5%"}
                    sizeMenu={"100%"}
                    isDisabled={false}
                    required
                  />
                )}
            </DivSegment>
            <TagComponent
              options={tagList ? tagList : []}
              placeholder={""}
              label={"Tag"}
              width={"90%"}
              widths={"73.9%"}
              sizeHeight={"3.5vh"}
              heights={"12vh"}
              sizeMenuList={"10vw"}
              sizeMenu={"35%"}
              set={(t) => setTags(t)}
            />   
            </Form>
            <DivButton>
            <ClickButton onClick={() => handleSubmit()}>
              <ButtonDefault
                type="adminSave"
                weightFont={"500"}
                sizeFont={"18px"}
                name={"Save"}
              />
            </ClickButton>
            <PositionButtonCancel onClick={() => handleCancel()}>
              <ButtonDefault type="adminCancel" name={"Cancel"} />
            </PositionButtonCancel> 
            </DivButton>  
        </Container>
    </ContainerCentral>
  )
}

export default CreateEditRelease;
