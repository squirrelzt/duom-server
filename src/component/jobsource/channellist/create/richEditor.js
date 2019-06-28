import React, { Component } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import axios from "axios";
import ImageCompressor from "image-compressor";
import {auth} from './../../../../common/auth';
class RichEditor extends Component {
    constructor(props) {
        super(props);      // 当父组件向子组件传递数据时，需要在这里传入props。
        this.state = {     // 通过state来定义当前组件内部自己的数据
        };
    }
    componentWillMount() { }
    componentDidMount() {
        class UploadAdapter {
            constructor(loader) {
                this.loader = loader;
            }
            // 上传图片方法   
            upload() {
                let file = this.loader.file;
                return new Promise((resolve, reject) => {
                    let uploadImgMethod = (f) => {
                        const data = new FormData();
                        const config = {
                            headers: { 
                                "content-type": "multipart/form-data",
                                "Accept": "*/*",
                                "DUOM_HEADER":localStorage.token
                             }
                        };
                        f.then(function(result){
                            data.append("file", result, result.name);
                            axios.post(auth.getPath() + "/v1/file/upload", data, config)
                                .then(response => {
                                    resolve({
                                        default: response.data
                                    });
                                });
                        });
                        
                    };
                    // 如果图片过大压缩图片{https://www.imooc.com/article/40038}
                    let maxSize = 100 * 1024; //显示图片最大为100k
                    let imgSize = file.size;  //获取当前图片的大小
                    if (imgSize > maxSize) {
                        let radio = maxSize / imgSize; //设置压缩率
                        // file:（可选）压缩的目标图像文件，类型是 File 或者 Blob
                        new ImageCompressor(file, {
                            quality: radio,        // 输出图像的画质，类型是 number。默认值是 undefined。值是0到1之间的数字。
                            convertSize: 1000000,  // 输出图像的文件类型，类型是 number。默认值是 5000000 (5MB)。
                            success(newFile) {
                                uploadImgMethod(newFile);
                            }
                        });
                    } else {
                        uploadImgMethod(file);
                    }
                });
            }
        }
        //初始化编辑器
        ClassicEditor.create(document.querySelector("#editor")).then(editor => {
            window.editor = editor;
            const content = "";
            editor.editing.view.document.on(  //监听事件
                "change:isFocused", (evt, name, value) => {
                    
                }
            );
            // 转化html
            const viewFragment = editor.data.processor.toView(content);
            const modelFragment = editor.data.toModel(viewFragment);
            editor.model.insertContent(
                modelFragment,
                editor.model.document.selection
            );
            //初始化上传方法
            editor.plugins.get("FileRepository").createUploadAdapter = loader => {
                //在document.querySelector("#editor")的最后插入标签
                // this.aaaa = true;
                return new UploadAdapter(loader);
            };
        })
            .catch(error => {
                console.error(error);
            });
    }
    getData() {
        return window.editor.getData()
    }
    componentWillUnmount() { }
    render() {
        return (
            <div name="content" id= "editor"> </div>
        );
    }
}
export default RichEditor;