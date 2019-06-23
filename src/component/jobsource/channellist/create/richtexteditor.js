import React, { Component } from 'react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ImageCompressor from "image-compressor";
import auth from './../../../../common/auth'
// import axios from "axios";
class RichTextEditor extends Component {
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
                console.log('###########');
                console.log(this.loader);
                return new Promise((resolve, reject) => {
                    let uploadImgMethod = f => {
                        const data = new FormData();
                        const config = {
                            headers: { "content-type": "multipart/form-data" }
                        };
                        data.append("file", f, f.name);
                        console.log('^^^^^^^^^^^^^^^^^^');
                        console.log(data);
                        console.log(f);
                        // auth.fetch('/api/user/upload','post',data, (result)=> {
                        //     console.log('结果:00000000000000000')
                        //     console.log(result);
                        // });
                        // axios.post("/api/user/upload", data, config)
                        //     .then(response => {
                        //         resolve({
                        //             default: response.data.url
                        //         });
                        //     });
                    };
                    // 如果图片过大压缩图片{https://www.imooc.com/article/40038}
                    let maxSize = 100 * 1024; //显示图片最大为100k
                    let imgSize = file.size;  //获取当前图片的大小
                    if (imgSize > maxSize) {
                        let radio = maxSize / imgSize; //设置压缩率
                        // file:（可选）压缩的目标图像文件，类型是 File 或者 Blob
                    } else {
                        uploadImgMethod(file);
                    }
                });
            }
        }
        //初始化编辑器
        ClassicEditor.create(document.querySelector("#editor")).then(editor => {
            window.editor = editor;
            const content = "请添加图文介绍";
            editor.editing.view.document.on(  //监听事件
                "change:isFocused", (evt, name, value) => {
                    //根据value  true获取焦点 false 失去焦点
                    if (value) {
                        console.log('我获取了焦点')
                    } else {
                        console.log('我失去了焦点')
                        console.log(this)
                        // if (this.aaaa === true) {
                        //     let oP = document.createElement('p');
                        //     let oBr = document.createElement('br');
                        //     oBr.setAttribute("data-cke-filler", true);
                        //     oP.appendChild(oBr)
                        //     document.querySelector("#editor").appendChild(oP);
                        //     this.aaaa = false;
                        // }
                    }
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
    componentWillUnmounts(){}
    render() {
        return (
            <div name="content" id= "editor" > </div>
        );
    }
}

export default RichTextEditor;