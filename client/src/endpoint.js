//const BASE_URL = "http://localhost:5012/risk-api/";
const BASE_URL = "https://staging.apilayer.valuevalidator.com/risk-api/";
const RISK_URL = "https://staging.apilayer.valuevalidator.com/node-api/";
/*********End points***** */

/******AIGOV ENDPOINTS****************** */
export const GET_GROUPNAME_SUBCONTROL = (groupname) =>
  `${RISK_URL}getGroupnamesubcontrol/api?groupname=${groupname}`;
export const GET_THRUST_SUBCONTROL = (thrustarea) =>
  `${RISK_URL}getthrustsubcontrol/api?thrustarea=${thrustarea}`;
export const GET_GROUP_API = `${RISK_URL}GovernanceGroupget/api`;
/************OBJECT TYPE********* */

export const GET_OBJECTTYPE_API = `${BASE_URL}api/get`;

export const ADD_OBJECTTYPE_API = `${BASE_URL}api/post`;

export const DELETE_OBJECTTYPE_API = (objectid) =>
  `${BASE_URL}api/delete/${objectid}`;

export const VIEW_OBJECTTYPE_API = (objectid) =>
  `${BASE_URL}api/get/${objectid}`;

export const UPDATE_OBJECTTYPE_API = (objectid) =>
  `${BASE_URL}api/update/${objectid}`;

/************OBJECT NAME*************************************/

export const OBJECTGET_OBJECTNAME_API = `${BASE_URL}api/add`;

export const GET_OBJECTNAME_API = `${BASE_URL}api/distinctobjectname`;
export const OBJECTADD_OBJECTNAME_API = `${BASE_URL}api/save`;

export const OBJECTDELETE_OBJECTNAME_API = (nameid) =>
  `${BASE_URL}api/remove/${nameid}`;

export const OBJECTVIEW_OBJECTNAME_API = (nameid) =>
  `${BASE_URL}api/add/${nameid}`;

export const OBJECTUPDATE_OBJECTNAME_API = (nameid) =>
  `${BASE_URL}api/edit/${nameid}`;

/*---------------------------------------Responsibility_Group-------------------------------------------------------------------------------*/

export const GET_RESPONSIBILITYGROUP_API = `${BASE_URL}api/in`;

export const ADD_RESPONSIBILITYGROUP_API = `${BASE_URL}api/display`;

export const DELETE_RESPONSIBILITYGROUP_API = (responsibilityid) =>
  `${BASE_URL}api/dremoves/${responsibilityid}`;

export const VIEW_RESPONSIBILITYGROUP_API = (responsibilityid) =>
  `${BASE_URL}api/in/${responsibilityid}`;

export const UPDATE_RESPONSIBILITYGROUP_API = (responsibilityid) =>
  `${BASE_URL}api/change/${responsibilityid}`;

/*-------------------------------------------------------Responsibility_Center-------------------------------------------------------------------------*/

export const GET_RESPONSIBILITYCENTER_API = `${BASE_URL}api/adding`;

export const ADD_RESPONSIBILITYCENTER_API = `${BASE_URL}api/saving`;

export const DELETE_RESPONSIBILITYCENTER_API = (responsibilitynameid) =>
  `${BASE_URL}api/deleted/${responsibilitynameid}`;

export const VIEW_RESPONSIBILITYCENTER_API = (responsibilitynameid) =>
  `${BASE_URL}api/adding/${responsibilitynameid}`;

export const UPDATE_RESPONSIBILITYCENTER_API = (responsibilitynameid) =>
  `${BASE_URL}api/convert/${responsibilitynameid}`;

/*------------------------------------Project--------------------------------------------------*/

export const GET_PROJECT_API = `${BASE_URL}projectgetapi`;
export const GET_PROJECTNAME_API = `${RISK_URL}getprojectnames/api`;
export const GET_SPECIFIC_PROJECT = (projectid) =>
  `${BASE_URL}specificproject/${projectid}`;
export const GET_SPECIFIC_PROJECTNAME = (projectid) =>
  `${BASE_URL}namespecificproject/${projectid}`;
export const GET_COMPANYSPECIFIC_PROJECT = (companyid) =>
  `${BASE_URL}projectgetApi/${companyid}`;
export const GET_COMPANY_PROJECT = (projectid, companyid) =>
  `${BASE_URL}projectApiGet/${projectid}/${companyid}`;
export const ADD_PROJECT_API = (companyid) =>
  `${BASE_URL}projectadd/api/${companyid}`;
export const UPDATE_COMPANY_PROJECT = (projectid, companyid) =>
  `${BASE_URL}projectUpdate/api/${projectid}/${companyid}`;
export const DELETE_PROJECT_API = (projectid) =>
  `${BASE_URL}projectRemove/${projectid}`;

/*------------------------------------Parameter Category-------------------------------------------------*/

export const GET_PARAMETERCATEGORY_API = `${BASE_URL}api/parameteradd`;

export const ADD_PARAMETERCATEGORY_API = `${BASE_URL}api/parametersaving`;

export const DELETE_PARAMETERCATEGORY_API = (categoryid) =>
  `${BASE_URL}api/parameterdeleted/${categoryid}`;

export const VIEW_PARAMETERCATEGORY_API = (categoryid) =>
  `${BASE_URL}api/parameteradd/${categoryid}`;

export const UPDATE_PARAMETERCATEGORY_API = (categoryid) =>
  `${BASE_URL}api/parameterupdate/${categoryid}`;

/*----------------------------------------parameter--------------------------------------------------------------*/

export const GET_PARAMETER_API = `${BASE_URL}api/parget`;

export const ADD_PARAMETER_API = `${BASE_URL}api/parpost`;

export const DELETE_PARAMETER_API = (parameterid) =>
  `${BASE_URL}api/pardelete/${parameterid}`;

export const VIEW_PARAMETER_API = (parameterid) =>
  `${BASE_URL}api/parget/${parameterid}`;

export const UPDATE_PARAMETER_API = (parameterid) =>
  `${BASE_URL}api/parput/${parameterid}`;

/*---------------------------risk_category---------------------------------------------------------*/

export const GET_RISKCATEGORY_API = `${BASE_URL}api/riskadd`;

export const ADD_RISKCATEGORY_API = `${BASE_URL}api/risksaving`;

export const DELETE_RISKCATEGORY_API = (riskcategoryid) =>
  `${BASE_URL}api/riskdeleted/${riskcategoryid}`;

export const VIEW_RISKCATEGORY_API = (riskcategoryid) =>
  `${BASE_URL}api/riskadd/${riskcategoryid}`;

export const UPDATE_RISKCATEGORY_API = (riskcategoryid) =>
  `${BASE_URL}api/riskupdate/${riskcategoryid}`;
//NOT YET

/*----------------------------subcategory------------------------------*/

export const GET_SUBCATEGORY_API = `${BASE_URL}api/subget`;

export const ADD_SUBCATEGORY_API = `${BASE_URL}api/subpost`;

export const DELETE_SUBCATEGORY_API = (subcategoryid) =>
  `${BASE_URL}api/riskdeleted/${subcategoryid}`;

export const VIEW_SUBCATEGORY_API = (subcategoryid) =>
  `${BASE_URL}api/subget/${subcategoryid}`;

export const UPDATE_SUBCATEGORY_API = (subcategoryid) =>
  `${BASE_URL}api/subupdate/${subcategoryid}`;
//NOT YET

/*------------------------------risk_group--------------------------------*/

export const GET_RISKGROUP_API = `${BASE_URL}api/riskgroupadd`;

export const ADD_RISKGROUP_API = `${BASE_URL}api/riskgroupsaving`;

export const DELETE_RISKGROUP_API = (riskgroupid) =>
  `${BASE_URL}api/riskgroupdeleted/${riskgroupid}`;

export const VIEW_RISKGROUP_API = (riskgroupid) =>
  `${BASE_URL}api/riskgroupadd/${riskgroupid}`;

export const UPDATE_RISKGROUP_API = (riskgroupid) =>
  `${BASE_URL}api/riskgroupupdate/${riskgroupid}`;

/*-----------------------risk_severit--------------------------------------*/

export const GET_RISKSEVERIT_API = `${BASE_URL}api/riskseverityget`;

export const ADD_RISKSEVERIT_API = `${BASE_URL}api/riskseveritypost`;

export const DELETE_RISKSEVERIT_API = (riskseverityid) =>
  `${BASE_URL}api/riskseveritydelete/${riskseverityid}`;

export const VIEW_RISKSEVERIT_API = (riskseverityid) =>
  `${BASE_URL}api/riskseverityget/${riskseverityid}`;

export const UPDATE_RISKSEVERIT_API = (riskseverityid) =>
  `${BASE_URL}api/riskseverityupdate/${riskseverityid}`;

/*-------------------------Risk Table----------------------------------------*/

/*-------------------------Risk Table----------------------------------------*/

export const GET_RISK_API = `${BASE_URL}api/risksget`;

export const ADD_RISK_API = `${BASE_URL}api/riskspost`;

export const DELETE_RISK_API = (riskid) =>
  `${BASE_URL}api/risksdelete/${riskid}`;

export const VIEW_RISK_API = (riskid) => `${BASE_URL}api/risksget/${riskid}
`;
export const UPDATE_RISK_API = (riskseverityid) =>
  `${BASE_URL}api/risksupdate/${riskseverityid}`;

export const RISKCODEVIEW_RISK_API = (riskcode) =>
  `${BASE_URL}api/riskcodeget/${riskcode}`;

export const MINRISKEXPOSURE_RISK_API = `${BASE_URL}api/riskexposure`;

/***********************Checklist********************************************* */
export const GET_CHECKLIST_API = `${BASE_URL}api/checklist`;
export const ADD_CHECKLIST_API = (algorithminventoryid) =>
  `${BASE_URL}api/addchecklist/${algorithminventoryid}`;
export const GET_SPECIFIC_CHECKLIST = (issueid) =>
  `${BASE_URL}api/checklist/${issueid}`;
export const DELETE_CHECKLIST_API = (checklistid) =>
  `${BASE_URL}api/removechecklist/${checklistid}`;
/************************************************ */

/*-----------------------------------------------------Company--------------------------------------------------------------------------------*/

export const GET_COMPANY_API = `${BASE_URL}companyget/api`;
export const DELETE_COMPANY_API = (companyid) =>
  `${BASE_URL}companyremove/api/${companyid}`;
export const GET_SPECIFIC_COMPANY = (companyid) =>
  `${BASE_URL}companyget/api/${companyid}`;
export const ADD_COMPANY_API = `${BASE_URL}companyadd/api/`;
export const UPDATE_COMPANY_API = (companyid) =>
  `${BASE_URL}updatecompany/api/${companyid}`;
export const GET_THRUST_AREA = `${BASE_URL}thrustarea/api`;

/*-------------------------Algorithm Inventory-----------------------------------------------*/

export const GET_ALGORITHMINVENTORY_API = `${BASE_URL}api/algorithminventoryget`;

export const ADD_ALGORITHMINVENTORY_API = `${BASE_URL}api/algorithminventorypost`;

export const DELETE_ALGORITHMINVENTORY_API = (algorithminventoryid) =>
  `${BASE_URL}api/algorithminventorydelete/${algorithminventoryid}`;

export const VIEW_ALGORITHMINVENTORY_API = (algorithminventoryid) =>
  `${BASE_URL}api/algorithminventoryget/${algorithminventoryid}`;

export const UPDATE_ALGORITHMINVENTORY_API = (algorithminventoryid) =>
  `${BASE_URL}api/algorithminventoryupdate/${algorithminventoryid}`;

/*----------------------Evidence-------------------------------*/

export const GET_EVIDENCE_API = `${BASE_URL}api/evidenceget`;

export const ADD_EVIDENCE_API = `${BASE_URL}api/evidencepost`;

export const DELETE_EVIDENCE_API = (evidenceid) =>
  `${BASE_URL}api/evidencedelete/${evidenceid}`;

export const VIEW_EVIDENCE_API = (evidenceid) =>
  `${BASE_URL}api/evidenceget/${evidenceid}`;

export const UPDATE_EVIDENCE_API = (evidenceid) =>
  `${BASE_URL}api/evidenceupdate/${evidenceid}`;

export const GET_COMPANYPROJECT_API = `${BASE_URL}api/companyprojectget`;
export const GET_SUBCONTROL_API = `${BASE_URL}getGovernancesubcontrol/api`;
export const GET_CONTROL_API = `${BASE_URL}controlGovernance/api`;

/*-------------------------------Governance-----------------------------*/

export const GET_GOVERNANCE_API = `${BASE_URL}resultGovernanceget/api`;

export const VIEW_EGOVERNANCE_API = (projectid, companyid) =>
  `${BASE_URL}api/evidence/${projectid},/${companyid}`;
export const GET_GOVERNANCE_GROUP = `${BASE_URL}GovernanceGroupget/api`;

/***********************Vulnerability*****************************/
export const GET_VULNERABILITY_API = `${BASE_URL}api/vulnerabilityget`;

export const ADD_VULNERABILITY_API = `${BASE_URL}api/vulnerabilitypost`;

export const DELETE_VULNERABILITY_API = (vulnerabilityid) =>
  `${BASE_URL}api/vulnerabilitydelete/${vulnerabilityid}`;

export const VIEW_VULNERABILITY_API = (vulnerabilityid) =>
  `${BASE_URL}api/vulnerabilityget/${vulnerabilityid}`;

export const UPDATE_VULNERABILITY_API = (vulnerabilityid) =>
  ` ${BASE_URL}api/vulnerabilityupdate/${vulnerabilityid};`;

/********************Category Graph*************************** */
export const RISKSUBCATEGORY_RISK_API = (category) =>
  `${BASE_URL}api/risksubcategory/${category}`;

export const RISKSEVERITYGRAPH_RISK_API = (riskgroup) =>
  `${BASE_URL}api/riskseveritygraph/${riskgroup}`;

export const RISKSUBCATEGORYREPORT_RISK_API = (category) =>
  ` ${BASE_URL}api/risksubcategoryreport/${category}`;

export const RISKGROUPGRAPH_RISK_API = (subcategory) =>
  `${BASE_URL}api/riskgroupgraph/${subcategory}`;

export const RISKGROUPREPORT_RISK_API = (subcategory) =>
  `${BASE_URL}api/riskgroupreport/${subcategory}`;

export const RISKSEVERITYREPORT_RISK_API = (riskgroup) =>
  `${BASE_URL}api/riskseverityreport/${riskgroup}`;
export const RISKCATEGORY_RISK_API = `${BASE_URL}api/riskcategory`;

/******************************************************* */

export const RISKMAIL_RISK_API = `${BASE_URL}api/send-emailfour/ids`;
