import axios from "axios";

/* 
获取图片列表
 */

export function parseImgList(url) {
	const api = 'http://localhost:8080/parse/img';
	const requestUrl = `${api}?url=${url}`;
	return axios.get(requestUrl).then(res => {
		console.info('parseImgList succeed', res);
		return res?.data;
	}).catch(e => {
		console.error('parseImgList error', e)
		return [];
	})
}