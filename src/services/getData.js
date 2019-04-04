import fetch from '../config/fetch';

export const queryCloudMirrorInvDetail = data => fetch('cloudMirrorInvJson/pageCloudMirrorDetail.json', data, 'POST', 'baseUrl')
export const cloudMirrorAssetEntry = data => fetch('cloudMirrorInvJson/insertloudMirrorAssetEntry.json', data, 'POST', 'baseUrl')
export const cloudMirrorAssetEdit = data => fetch('cloudMirrorInvJson/editCloudMirrorAsset.json', data, 'POST', 'baseUrl')

// 云镜池的接口
export const queryCloudMirrorInvDetails = data => fetch('cloudMirrorInvJson/pageCloudMirrorInvDetail.json', data, 'POST', 'baseUrl')
export const queryCloudMirrorInvById = data => fetch('cloudMirrorInvJson/getCloudMirrorInvById.json', data, 'GET', 'baseUrl')
export const pageCloudMirrorLogDetail = data => fetch('/cloudMirrorLogJson/pageCloudMirrorLogDetail.json', data, 'POST', 'baseUrl')

export const pageCloudMirrorSalesDetail = data => fetch('cloudMirrorInvJson/pageCloudMirrorSalesDetail.json', data, 'POST', 'baseUrl')
export const listCloudMirrorInvById = data => fetch('cloudMirrorInvJson/listCloudMirrorInvById.json', data, 'GET', 'baseUrl')
export const insertCloudMirrorSales = data => fetch('cloudMirrorInvJson/insertCloudMirrorSales.json', data, 'POST', 'baseUrl')

export const ListDealerInfoVo = data => fetch('cloudMirrorInvJson/listDealerInfoVo.json', data, 'POST', 'baseUrl') //客户下拉
export const importExcel = data => fetch('cloudMirrorInvJson/importExcel.json', data, 'POST', 'baseUrl') //EXcel上传
export const downloadTemplate = data => fetch('cloudMirrorInvJson/downloadTemplate.json', data, 'GET', 'baseUrl') //EXcel下载



