<template>
	<div class="home">
		<a-row justify="center">
			<a-col>
				<a-input-search v-model:value="searchText" placeholder="请输入要抓取的网址" style="width: 400px"
					@search="onSearch" size="large" />
			</a-col>
		</a-row>
		<a-tabs v-model:activeKey="activeKey" style="margin-top: 16px;">
			<a-tab-pane key="image">
				<template #tab>
					<span>
						<FileImageOutlined />
						图片
					</span>
				</template>
				<div>
					<a-row>
						<a-col>
							<div style="display: flex; padding-left: 24px;">
								<a-typography-title :level="3" style="margin-right: 20px;">图片列表</a-typography-title>
								<a-button type="primary" @click="doSingleDownload()">打包下载</a-button>
							</div>
							<div class="imgList" :key="index" v-for="(img, index) in imgList">
								<a-image :width="200" :src="img" />
								<a-button type="danger" @click="doSingleDownload(item)">download</a-button>
							</div>
						</a-col>
					</a-row>
				</div>
			</a-tab-pane>
			<a-tab-pane key="video">
				<template #tab>
					<span>
						<VideoCameraOutlined />
						视频
					</span>
				</template>
				<a-list :grid="{ gutter: 16, column: 4}" :data-source="resource?.value">
					<template #renderItem="{item}">
						<a-list-item>
							<a-image :src="item" />
							<a-button type="danger" @click="doSingleDownload(item)">打包下载</a-button>
						</a-list-item>
					</template>
				</a-list>
			</a-tab-pane>
			<a-tab-pane key="audio">
				<template #tab>
					<span>
						<SoundOutlined />
						音频
					</span>
				</template>
				<a-list :grid="{ gutter: 16, column: 4}" :data-source="resource?.data">
					<template #renderItem="{item}">
						<a-list-item>
							<a-image :src="item" />
							<a-button type="danger" @click="doSingleDownload(item)">打包下载</a-button>
						</a-list-item>
					</template>
				</a-list>
			</a-tab-pane>
		</a-tabs>
	</div>
</template>

<script>
	import {
		FileImageOutlined,
		VideoCameraOutlined,
		SoundOutlined
	} from '@ant-design/icons-vue';
	import {
		ref
	} from "vue"
	import {
		parseImgList
	} from '../service/index.js'
	import JSZip from "jszip"
	import {
		saveAs
	} from 'file-saver';
	import {
		message
	} from 'ant-design-vue';
	export default {
		name: 'Home',
		components: {
			FileImageOutlined,
			VideoCameraOutlined,
			SoundOutlined
		},
		setup() {
			const activeKey = ref('image')
			const imgList = ref([
				'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
				'https://aliyuncdn.antdv.com/logo.png',
				'https://aliyuncdn.antdv.com/vue.png'
			])
			const searchText = ref('')
			const resource = ref({})
			const onSearch = async (text) => {
				if (text) {
					let resultData = await parseImgList(text)
					console.log(resultData);
					resource.value = resultData;
				} else {
					message.error("请输入网址")
				}
			}
			const doSingleDownload = (imgUrl) => {
				saveAs(imgUrl, "image.jpg")
			}
			const downLoad = async () => {
				var zip = new JSZip();
				zip.file("Hello.txt", "Hello World\n");
				var imgFolder = zip.folder("images");
				for (const imgData of resource.value.imgList) {
					imgFolder.file("smile.jpg", imgData)
				}
				// img.file("smile.jpg", {
				// 	base64: true
				// });
				zip.generateAsync({
						type: "blob"
					})
					.then(function(content) {
						// see FileSaver.js
						saveAs(content, "example.zip");
					});
			}
			return {
				activeKey,
				searchText,
				resource,
				onSearch,
				imgList,
				downLoad,
				doSingleDownload
			}
		}

	}
</script>
<style>
	.imgList {
		padding: 24px;
		text-align: center;
	}
</style>
