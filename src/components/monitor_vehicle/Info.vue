<template>
    <div id="app">
		<Vew></Vew>
		<div id="clear">
		</div>
		<div id="content" >
			<div id="left_content">
				<div id="nav1" >
					<ul >
						<li class="li_c" id="li1" @click="cominfo()" value="0"><a style="color:white" class="a_c" href="#" ><img src="./image/monitor_vehicle/car_mon.png" /> 公司信息</a></li>
						<li class="li_c" @click="carinfo()" value="0"><a style="color:white" href="#"> <img src="./image/monitor_vehicle/table.png" />车辆信息</a></li>

					</ul>
				</div>
			</div>
			<div id="right" class="afcontain">
				<!-- 公司信息 -->
				<br>
				<div id="companyinfo">
					<div style="	text-align: center;">
						<label style="color:white; font-size: 15px;" >公司名称：</label>
						<input type="text" placeholder="search" @input="search" list="cars" class="search" v-model="va" >
						<datalist id="cars">
							<option v-for="(item,index) in searchlist" :value="item" :key="index"></option>
						</datalist>
						<label style="color:white; font-size: 15px;" >联系人：</label>
						<input type="text" placeholder="search" @input="search1" class="search" v-model="va1">
						<datalist >
							<option v-for="(item,index) in searchlist1" :value="item" :key="index"></option>
						</datalist>
						<!-- <input type="button" class="add" @click="add()"  value="新增">  -->
					</div>
					<div style="overflow:hidden;"> 
						<a  href="#" @click="add()" style="float: right; color: white; font-size: 16px; 	margin-right: 38px;">新增</a>
						<a href="#" @click="add()" style="float: right; color: white; font-size: 16px; 	margin-right: 2px;">
							<img class="nav_image" src="./image/monitor_vehicle/inc1.png" /> 
						</a>
					</div>
					<div >
						<table>
							<tr>
								<th>id</th>
								<th>编号</th>
								<th>公司名称</th>
								<th>联系人</th>
								<th>联系电话</th>
								<th>操作</th>
							</tr>
							<tr v-cloak v-for="(item, index) of tabdata" :key="index">
								<td>{{(index+1+(pageIndex-1)*pageSize)}}</td>
								<td>{{item.CAR_COMPANY_ID}}</td>
								<td>{{item.CAR_COMPANY_NAME}}</td>
								<td>{{item.CONTACT}}</td>
								<td>{{item.CONTACT_NUMBER}}</td>
								<td><a style="color:#4b8df8" href="javascript:;" @click="update(index)">修改</a> | <a style="color:orangered;" href="javascript:;" @click="del(index)">删除</a></td>
							</tr>
						</table>
						<VPagination style="color:white;float: right;" :total="total" @page-change="pageChange1" @page-size-change="pageSizeChange1" :pageSize="pageSize" :pageSizeOption="pageSizeOption"></VPagination>
					</div>
					<!-- <model :list='selectedlist' :isactive="isActive" v-cloak @change="changeOverlay" @modify="modify"></model> -->
				</div>

				<!-- 车辆信息 -->
				<div id="carinfo" style="display:none">
					<div  style="	text-align: center;">
						<label style="color:white; font-size: 15px;">车辆编号：</label>
						<input type="text" placeholder="search" @input="search_car" class="search" v-model="va_car" >
						<datalist>
							<option v-for="(item,index) in searchlist_car" :value="item" :key="index"></option>
						</datalist>
						<label style="color:white; font-size: 15px;">公司名称：</label>
						<input type="text" placeholder="search" @input="search1_car" class="search" v-model="va1_car">
						<datalist >
							<option v-for="(item,index) in searchlist1_car" :value="item" :key="index"></option>
						</datalist>
						<!-- <input type="button" class="add" @click="add_car()"  value="新增">  -->
					</div>
					<div style="overflow:hidden;"> 
						<a  href="#" @click="add_car()" style="float: right; color: white; font-size: 16px; 	margin-right: 38px;">新增</a>
						<a href="#" @click="add_car()" style="float: right; color: white; font-size: 16px; 	margin-right: 2px;">
							<img class="nav_image" src="./image/monitor_vehicle/inc1.png" /> 
						</a>
					</div>
					<div>
						<table frame=void>
							<tr>
								<th>id</th>
								<th>编号</th>
								<th>车辆编号</th>
								<th>公司名称</th>
								<th>车辆状态</th>
								<th>车辆类型</th>
								<th>终端编号</th>
								<th>联系人</th>
								<th>联系电话</th>
								<th>操作</th>
							</tr>
							<tr v-cloak v-for="(item, index) of tabdata_car" :key="index">
								<td>{{(index+1+(pageIndex_car-1)*pageSize_car)}}</td>
								<td>{{item.CAR_BELONG_ID}}</td>
								<td>{{item.CAR_NAME}}</td>
								<td>{{item.CAR_BELONG_COMPANY}}</td>
								<td>{{item.CAR_STATUS}}</td>
								<td>{{item.CAR_TYPES}}</td>
								<td>{{item.TERMINAL_CODE}}</td>
								<td>{{item.CAR_CONTACT}}</td>
								<td>{{item.CAR_CONTACT_NUMBER}}</td>
								<td><a href="javascript:;" style="color:#4b8df8" @click="update_car(index)">修改</a> | <a style="color:orangered;" href="javascript:;" @click="del_car(index)">删除</a></td>
							</tr>
						</table>
						<VPagination style="color:white; float: right;" :total="total_car" @page-change="pageChange1_car" @page-size-change="pageSizeChange1_car" :pageSize="pageSize_car" :pageSizeOption="pageSizeOption_car"></VPagination>
					</div>
					<!-- <model :list='selectedlist' :isactive="isActive" v-cloak @change="changeOverlay" @modify="modify"></model> -->
				</div>

			</div>
			

		</div>
		<div id="footer">
			<p>
				<a href="#">关于</a>
				<a href="#">广告</a>
				<a href="#">联系</a>
				<a href="#">合作</a>
				<a href="#">版权</a>
			</p>
			<p>
				<!-- <a href="#">京ICP备 0000001号</a> -->
				All right(C) 2008-2010 resved.
			</p>
		</div>
		<!-- <modal>司 -->
		<div class="overlay" v-show="isActive">
			<div class="con">
			<div class="fhead">
				<label class="title">公司信息： 新增 | 修改</label>
			</div>
				<div class="content_c" style="	text-align: center;">
					<table>
						<tr>
							<td class="lab">公司名称</td>
							<td><input  type="text" v-model="modifylist.CAR_COMPANY_NAME"></td>
						</tr>
						<tr>
							<td class="lab">联系人</td>
							<td>
							<input type="text" v-model="modifylist.CONTACT">	
							</td>
						</tr>
						<tr>
							<td class="lab">联系电话</td>
							<td><input type="text" v-model="modifylist.CONTACT_NUMBER"></td>
						</tr>
          </table>
					<br>
					<div style="background: white">
						
								<input type="button" style="margin-left: 20px" class="but1" value="取消" @click="cancel()">
								<input type="button"  class="but2" value="保存" @click="save()">
					
					</div>	
				</div>
			</div>
		</div>
		<!-- </modal> -->

		<!-- <modal>车 -->
		<div class="overlay" v-show="isActive_car">
			<div class="con1">
			<div class="fhead">
				<label class="title">车辆信息： 新增 | 修改</label>
			</div>
				<div class="content_c">
					<table>
                        <tr>
                        <td class="lab">车辆编号</td>
                        <td><input type="text" v-model="modifylist_car.CAR_NAME"></td>
                        </tr>
                        <tr>
                        <td class="lab">公  司</td>
                        <td>
                        <!-- <input type="text" v-model="modifylist_car.CAR_BELONG_COMPANY"> -->
						<select v-model="modifylist_car.CAR_BELONG_COMPANY">
							<option :value="item.CAR_COMPANY_NAME" v-for="(item,index) of company" :key="index" >{{item.CAR_COMPANY_NAME}}</option>
							<!-- <option value="" v-for="(item,index) of list2" :key="index" >{{list2.name}}</option> -->
						</select>
                        </td>
                        </tr>
						<tr>
                        <td class="lab">状  态</td>
                        <td><input type="text" v-model="modifylist_car.CAR_STATUS"></td>
                        </tr>
						<tr>
                        <td class="lab">类  型</td>
                        <td><input type="text" v-model="modifylist_car.CAR_TYPES"></td>
                        </tr>
						<tr>
                        <td class="lab">终端编号</td>
                        <td><input type="text" v-model="modifylist_car.TERMINAL_CODE"></td>
                        </tr>
						<tr>
                        <td class="lab">联系人</td>
                        <td><input type="text" v-model="modifylist_car.CAR_CONTACT"></td>
                        </tr>
						<tr>
                        <td class="lab">联系电话</td>
                        <td><input type="text" v-model="modifylist_car.CAR_CONTACT_NUMBER"></td>
                        </tr>
                	</table>
					<br>
                	<p style="text-align:center;">
                        <input type="button" class="but1" value="取消" @click="cancel_car()">
                        <input type="button" class="but2" value="保存" @click="save_car()">
                    </p>
				</div>
			</div>
		</div>
		<!-- </modal> -->
    </div>
</template>

<script>
import axios from 'axios'
import 'vue-easytable/libs/themes-base/index.css'
import {VTable,VPagination} from 'vue-easytable'
import Vew from './View.vue'

export default {
    name: 'Info',
    data(){
        return{
			company_list:[],
			modifylist:{CAR_COMPANY_NAME:"",CONTACT:"",CONTACT_NUMBER:""},
			isActive: false,
			index:'',
			jud:false,
			searchlist:[],
			show_list:[],
			searchlist1:[],
			result:[],
			tabdata:[],
			va:'',
			va1:'',
			pageSize:5,
			pageIndex:1,
			pageSizeOption:[5,10,20],
			total:0,
			company:[],
			company_list_car:[],
			modifylist_car:{CAR_NAME:"",CAR_BELONG_COMPANY:"",CAR_STATUS:"",CAR_TYPES:"",TERMINAL_CODE:'',CAR_CONTACT:"",CAR_CONTACT_NUMBER:""},
			isActive_car: false,
			index_car:'',
			jud_car:false,
			searchlist_car:[],
			show_list_car:[],
			searchlist1_car:[],
			result_car:[],
			tabdata_car:[],
			va_car:'',
			va1_car:'',
			pageSize_car:5,
			pageIndex_car:1,
			pageSizeOption_car:[5,10,20],
			total_car:0,
        }
	},
	components:{
			VTable,
			VPagination,
			Vew
	},
	created() {
		// var left_li = document.getElementsByClassName("li_c");
		// left_li[0].style.b
		
		axios({
			headers: {
                  token: this.$store.state.token
                },
			method:'get',
			url:'/api/CarCompany/selectall'
		}).then((data)=>{
			this.company_list = data.data.data;
			console.log(this.company_list);
			this.show_list = data.data.data;
			this.total = this.company_list.length;
			this.tabdata = this.show_list.slice(0, this.pageSize);
		});

		axios({
			headers: {
                  token: this.$store.state.token
                },
			method:'get',
			url:'/api/CarBelong/selectall'
		}).then((data)=>{
			this.company_list_car = data.data.data;
			console.log(this.company_list_car);
			this.show_list_car = data.data.data;
			this.total_car = this.company_list_car.length;
			this.tabdata_car = this.show_list_car.slice(0, this.pageSize_car);
		});
	},
	mounted(){
		var left_li = document.getElementById('li1');
		left_li.style.boxShadow = '-20px 0px 15px #034c6a inset, 0px -20px 15px #034c6a inset,20px 0px 15px #034c6a inset, 0px 20px 15px #034c6a inset'
		
	},
	methods: {
		carinfo(){
			var ri = document.getElementById('carinfo');
			var ric = document.getElementById('companyinfo');
			ri.style.display = 'block';
			ric.style.display = 'none';
			var left_li = document.getElementsByClassName("li_c");
			left_li[1].style.boxShadow = '-20px 0px 15px #034c6a inset, 0px -20px 15px #034c6a inset,20px 0px 15px #034c6a inset, 0px 20px 15px #034c6a inset'
			left_li[0].style.backgroundColor = '##072951';
			left_li[0].style.boxShadow = 'none'

			
		},
		cominfo(){
			var ri = document.getElementById('carinfo');
			var ric = document.getElementById('companyinfo');
			ri.style.display = 'none';
			ric.style.display = 'block';
			var left_li = document.getElementsByClassName("li_c");
			left_li[0].style.boxShadow = '-20px 0px 15px #034c6a inset, 0px -20px 15px #034c6a inset,20px 0px 15px #034c6a inset, 0px 20px 15px #034c6a inset'
			left_li[1].style.backgroundColor = '##072951';
			left_li[1].style.boxShadow = 'none'

		},

		update(index){
			this.isActive =true;
			this.modifylist.CAR_COMPANY_NAME=this.tabdata[index].CAR_COMPANY_NAME;
			this.modifylist.CONTACT=this.tabdata[index].CONTACT;
			this.modifylist.CONTACT_NUMBER=this.tabdata[index].CONTACT_NUMBER;
			this.jud = true;
			this.index =index
		},
		del(index){
			
			var url1 = '/api/CarCompany/delete/'+this.tabdata[index].CAR_COMPANY_ID
			axios({
				headers: {
                  token: this.$store.state.token
                },
			method:'get',
			url:url1
			}).then((data)=>{
			// this.company_list = data.data;
			});
			
			console.log(this.show_list[1].CAR_COMPANY_ID)
			for(var i =0; i<this.show_list.length;i++){
				if(this.tabdata[index].CAR_COMPANY_ID == this.show_list[i].CAR_COMPANY_ID){
					this.show_list.splice(i,1);
					this.company_list.splice(i,1);
				}
			}
			this.tabdata.splice(index,1);
			this.total--;
			console.log(this.company_list);
		},
		add(){
			
			this.isActive = true;
			this.jud = false;

		},
		save(){
			// this.company_list[this.company_list.length] = this.modifylist;
			console.log(this.modifylist)
			if(this.jud){
				var num_len = this.modifylist.CONTACT_NUMBER.length;
				var st = /[0-1][3|4|7|8][0-9]{9}/
				var arr = this.modifylist.CONTACT_NUMBER.match(st);
				if(this.modifylist.CAR_COMPANY_NAME!='' && this.modifylist.CONTACT!=''&&num_len==11&& arr != null){
				this.tabdata[this.index].CAR_COMPANY_NAME = this.modifylist.CAR_COMPANY_NAME;
				console.log(this.modifylist.CAR_COMPANY_NAME)
				this.tabdata[this.index].CONTACT = this.modifylist.CONTACT;
				this.tabdata[this.index].CONTACT_NUMBER = this.modifylist.CONTACT_NUMBER;
				
					axios({
						headers: {
                  token: this.$store.state.token
                },
						method:'post',
						url:'/api/CarCompany/update',
						data:this.tabdata[this.index]
					}).then((data)=>{
					});
				}else{
					window.alert("请输入正确的数据")
				}
			}else{
				// var aa;
				var num_len1 = this.modifylist.CONTACT_NUMBER.length;
				var st1 = /[0-9]{11}/
				var arr1 = this.modifylist.CONTACT_NUMBER.match(st1);
				if(this.modifylist.CAR_COMPANY_NAME!='' && this.modifylist.CONTACT!=''&&num_len1==11&& arr1 != null){

					this.total++;
					var len = this.show_list.length;
					this.company_list[len] = {CAR_COMPANY_ID:'', CAR_COMPANY_NAME:"",CONTACT:"",CONTACT_NUMBER:""};
					axios({
						headers: {
                  token: this.$store.state.token
                },
						method:'post',
						url:'/api/CarCompany/install',
						data:this.modifylist
					}).then((data)=>{
						console.log(data);
					});
					
					this.company_list[len].CAR_COMPANY_ID = Number(this.company_list[len-1].CAR_COMPANY_ID)+1;
					this.company_list[len].CAR_COMPANY_NAME = this.modifylist.CAR_COMPANY_NAME;
					this.company_list[len].CONTACT = this.modifylist.CONTACT;
					this.company_list[len].CONTACT_NUMBER = this.modifylist.CONTACT_NUMBER;
					this.show_list[len] = this.company_list[len];
					console.log( parseInt(this.show_list.length/this.pageSize),this.show_list.length%this.pageSize)
					
					if(this.pageIndex == (parseInt(this.show_list.length/this.pageSize)+1)&&(this.show_list.length%this.pageSize!=0)){
						var len_tab = this.tabdata.length;
						this.tabdata[len_tab] = {CAR_COMPANY_ID:'', CAR_COMPANY_NAME:"",CONTACT:"",CONTACT_NUMBER:""};
						console.log(this.tabdata[len_tab]);
						this.tabdata[len_tab].CAR_COMPANY_ID = Number(this.company_list[len-1].CAR_COMPANY_ID)+1;
						this.tabdata[len_tab].CAR_COMPANY_NAME = this.modifylist.CAR_COMPANY_NAME;
						this.tabdata[len_tab].CONTACT = this.modifylist.CONTACT;
						this.tabdata[len_tab].CONTACT_NUMBER = this.modifylist.CONTACT_NUMBER;
						console.log("hhhhhhhh")
					}
					
				}else{
					window.alert("请输入正确的数据")
				}
			}
			this.isActive = false;
			this.modifylist = {CAR_COMPANY_NAME:"",CONTACT:"",CONTACT_NUMBER:""};
		},
		cancel(){
			this.isActive = false;
			this.modifylist = {CAR_COMPANY_NAME:"",CONTACT:"",CONTACT_NUMBER:""};
			console.log(this.company_list)
		},
		search() {
			// console.log(e)
			// var v = e.target.value,
			var v =this.va
			self = this;
			self.searchlist = [];
			var se =[];
			if (v) {
				
				// 过滤需要的数据
				if(this.result.length == 0){
					this.show_list.forEach( (item) =>{
						
						if (item.CAR_COMPANY_NAME.indexOf(v) > -1) {
							if (self.searchlist.indexOf(item.CAR_COMPANY_NAME) == -1) {
								self.searchlist.push(item.CAR_COMPANY_NAME);
							}
							this.result.push(item);
						}
					});
				}else{
						var ss = [];
						this.result.forEach( (item) =>{
						
						if (item.CAR_COMPANY_NAME.indexOf(v) > -1) {
							if (self.searchlist.indexOf(item.CAR_COMPANY_NAME) == -1) {
								self.searchlist.push(item.CAR_COMPANY_NAME);
							}
							ss.push(item);
						}
						this.result=ss
					});
				}

				this.tabdata = this.result; // 将过滤后的数据给了slist
			} else {
				// 没有搜索内容，则展示全部数据
				// this.setSlist(this.list);
				if(this.searchlist.length==0&&this.searchlist1.length==0){
					this.result=[];
					this.pageChange1(this.pageIndex);
					// console.log(this.show_list);
				}else if(this.searchlist.length==0&&this.searchlist1.length!=0){
					this.result=[];
					// console.log(se[0])
					this.search1();
				}
				else{
					this.tabdata = this.result;
				}
			}
		},
	
		search1() {
			var v = this.va1,
			self = this;
			self.searchlist1 = [];
			if (v) {
				
				// 过滤需要的数据
				if(this.result.length == 0){
				this.show_list.forEach( (item) =>{
					console.log(item.CONTACT.indexOf(v));
					if (item.CONTACT.indexOf(v) > -1) {
						if (self.searchlist1.indexOf(item.CONTACT) == -1) {
							self.searchlist1.push(item.CONTACT);
						}
						this.result.push(item);
					}
				});

				}else{
						var ss = [];
						this.result.forEach( (item) =>{
						if (item.CONTACT.indexOf(v) > -1) {
							if (self.searchlist1.indexOf(item.CONTACT) == -1) {
								self.searchlist1.push(item.CONTACT);
							}
							ss.push(item);
						}
						this.result=ss
					});
				}
				this.tabdata = this.result; // 将过滤后的数据给了slist
			} else {
				// 没有搜索内容，则展示全部数据
				// this.setSlist(this.list);
				if(this.searchlist1.length==0&&this.searchlist.length==0){
					this.result=[];
					this.pageChange1(this.pageIndex);
					console.log(this.show_list);
				}
				else if(this.searchlist1.length==0&&this.searchlist.length!=0){
					this.result=[];
					// console.log(se[0])
					this.search();
				}
				else{
					this.tabdata = this.result;
				}
			}
		},
		pageChange1(pageIndex){
			console.log(pageIndex);
			this.pageIndex = pageIndex;
			this.gettabdata((pageIndex-1)*this.pageSize, pageIndex*this.pageSize); 
        },

        pageSizeChange1(pageSize){
			console.log(pageSize);
			this.pageSize = pageSize;
			this.pageIndex = 1;
			this.gettabdata(0,pageSize);
		},
		gettabdata(startindex, endindex){
			this.tabdata = this.show_list.slice(startindex, endindex);
		},


		update_car(index){
			this.isActive_car =true;
			this.modifylist_car.CAR_NAME=this.tabdata_car[index].CAR_NAME;
			this.modifylist_car.CAR_BELONG_COMPANY=this.tabdata_car[index].CAR_BELONG_COMPANY;
			this.modifylist_car.CAR_STATUS=this.tabdata_car[index].CAR_STATUS;
			this.modifylist_car.CAR_TYPES=this.tabdata_car[index].CAR_TYPES;
			this.modifylist_car.TERMINAL_CODE = this.tabdata_car[index].TERMINAL_CODE
			this.modifylist_car.CAR_CONTACT=this.tabdata_car[index].CAR_CONTACT;
			this.modifylist_car.CAR_CONTACT_NUMBER=this.tabdata_car[index].CAR_CONTACT_NUMBER;

			this.jud_car = true;
			this.index_car =index
		},
		del_car(index){
			
			var url1 = '/api/CarBelong/delete/'+this.tabdata_car[index].CAR_BELONG_ID
			axios({
				headers: {
                  token: this.$store.state.token
                },
			method:'get',
			url:url1
			}).then((data)=>{
			// this.company_list = data.data;
			});
			
			console.log(this.show_list_car[1].CAR_BELONG_ID)
			for(var i =0; i<this.show_list_car.length;i++){
				if(this.tabdata_car[index].CAR_BELONG_ID == this.show_list_car[i].CAR_BELONG_ID){
					this.show_list_car.splice(i,1);
					this.company_list_car.splice(i,1);
				}
			}
			this.tabdata_car.splice(index,1);
			this.total_car--;
			console.log(this.company_list_car);
		},
		add_car(){
			axios({
				headers: {
                  token: this.$store.state.token
                },
			method:'get',
			url:'/api/CarCompany/select'
			}).then((data)=>{
			this.company = data.data.data;
			console.log(this.company);
			});
			this.isActive_car = true;
			this.jud_car = false;
		},
		save_car(){
			// this.company_list[this.company_list.length] = this.modifylist;
			// console.log(this.modifylist_car)
			var num_len_c = this.modifylist_car.CAR_CONTACT_NUMBER.length;
			var st_c = /[0-1][3|4|7|8][0-9]{9}/
			var arr_c = this.modifylist_car.CAR_CONTACT_NUMBER.match(st_c);
			if(this.modifylist_car.CAR_NAME != '' && this.modifylist_car.CAR_BELONG_COMPANYT != ''&&
			   this.modifylist_car.CAR_STATUS != '' && this.modifylist_car.CAR_TYPES != '' && this.modifylist_car.TERMINAL_CODE!= '' && this.modifylist_car.CAR_CONTACT != ''&&
			   num_len_c == 11 && arr_c != null){

				if(this.jud_car){

					console.log(this.tabdata_car[this.index_car])
					this.tabdata_car[this.index_car].CAR_NAME = this.modifylist_car.CAR_NAME;
					this.tabdata_car[this.index_car].CAR_BELONG_COMPANY = this.modifylist_car.CAR_BELONG_COMPANY;
					this.tabdata_car[this.index_car].CAR_STATUS = this.modifylist_car.CAR_STATUS;
					this.tabdata_car[this.index_car].CAR_TYPES = this.modifylist_car.CAR_TYPES;
					this.tabdata_car[this.index_car].TERMINAL_CODE = this.modifylist_car.TERMINAL_CODE;
					this.tabdata_car[this.index_car].CAR_CONTACT = this.modifylist_car.CAR_CONTACT;
					this.tabdata_car[this.index_car].CAR_CONTACT_NUMBER = this.modifylist_car.CAR_CONTACT_NUMBER;

					axios({
						headers: {
                  token: this.$store.state.token
                },
						method:'post',
						url:'/api/CarBelong/update',
						data:this.tabdata_car[this.index_car]
					}).then((data)=>{
					});
				}else{
					// var aa;
					this.total_car++;
					var len = this.show_list_car.length;
					this.company_list_car[len] = {CAR_BELONG_ID:"",CAR_NAME:"",CAR_BELONG_COMPANY:"",CAR_STATUS:"",CAR_TYPES:"", TERMINAL_CODE:"",CAR_CONTACT:"",CAR_CONTACT_NUMBER:""};
					axios({
						headers: {
                  token: this.$store.state.token
                },
						method:'post',
						url:'/api/CarBelong/install',
						data:this.modifylist_car
					}).then((data)=>{
						console.log(data);
					});
					
					this.company_list_car[len].CAR_BELONG_ID = Number(this.company_list_car[len-1].CAR_BELONG_ID)+1;
					this.company_list_car[len].CAR_NAME = this.modifylist_car.CAR_NAME;
					this.company_list_car[len].CAR_BELONG_COMPANY = this.modifylist_car.CAR_BELONG_COMPANY;
					this.company_list_car[len].CAR_STATUS = this.modifylist_car.CAR_STATUS;
					this.company_list_car[len].CAR_TYPES = this.modifylist_car.CAR_TYPES;
					this.company_list_car[len].TERMINAL_CODE = this.modifylist_car.TERMINAL_CODE;
					this.company_list_car[len].CAR_CONTACT = this.modifylist_car.CAR_CONTACT;
					this.company_list_car[len].CAR_CONTACT_NUMBER = this.modifylist_car.CAR_CONTACT_NUMBER;

					this.show_list_car[len] = this.company_list_car[len];
					console.log( parseInt(this.show_list_car.length/this.pageSize_car),this.show_list_car.length%this.pageSize_car)
					
					if(this.pageIndex_car == (parseInt(this.show_list_car.length/this.pageSize_car)+1)&&(this.show_list_car.length%this.pageSize_car!=0)){
						var len_tab = this.tabdata_car.length;
						this.tabdata_car[len_tab] = {CAR_BELONG_ID:"",CAR_NAME:"",CAR_BELONG_COMPANY:"",CAR_STATUS:"",CAR_TYPES:"",TERMINAL_CODE:"",CAR_CONTACT:"",CAR_CONTACT_NUMBER:""};
						console.log(Number(this.company_list_car[len-1].CAR_BELONG_ID)+1);
						this.tabdata_car[len_tab].CAR_BELONG_ID = Number(this.company_list_car[len-1].CAR_BELONG_ID)+1;
						this.tabdata_car[len_tab].CAR_NAME = this.modifylist_car.CAR_NAME;
						this.tabdata_car[len_tab].CAR_BELONG_COMPANY = this.modifylist_car.CAR_BELONG_COMPANY;
						this.tabdata_car[len_tab].CAR_STATUS = this.modifylist_car.CAR_STATUS;
						this.tabdata_car[len_tab].CAR_TYPES = this.modifylist_car.CAR_TYPES;
						this.tabdata_car[len_tab].TERMINAL_CODE = this.modifylist_car.TERMINAL_CODE;
						this.tabdata_car[len_tab].CAR_CONTACT = this.modifylist_car.CAR_CONTACT;
						this.tabdata_car[len_tab].CAR_CONTACT_NUMBER = this.modifylist_car.CAR_CONTACT_NUMBER;
						console.log("hhhhhhhh")
					}
				}
				
			}else{
				window.alert("请输入正确的数据")
			}
			this.isActive_car = false;
			this.modifylist_car ={CAR_NAME:"",CAR_BELONG_COMPANY:"",CAR_STATUS:"",CAR_TYPES:"",TERMINAL_CODE:"",CAR_CONTACT:"",CAR_CONTACT_NUMBER:""};
		},
		cancel_car(){
			this.isActive_car = false;
			this.modifylist_car = {CAR_NAME:"",CAR_BELONG_COMPANY:"",CAR_STATUS:"",CAR_TYPES:"",TERMINAL_CODE:"",CAR_CONTACT:"",CAR_CONTACT_NUMBER:""};
			console.log(this.company_list_car)
		},
		search_car() {
			// console.log(e)
			// var v = e.target.value,
			var v =this.va_car
			self = this;
			self.searchlist_car = [];
			var se =[];
			if (v) {
				
				// 过滤需要的数据
				if(this.result_car.length == 0){
					this.show_list_car.forEach( (item) =>{
						
						if (item.CAR_NAME.indexOf(v) > -1) {
							if (self.searchlist_car.indexOf(item.CAR_NAME) == -1) {
								self.searchlist_car.push(item.CAR_NAME);
							}
							this.result_car.push(item);
						}
					});
				}else{
						var ss = [];
						this.result_car.forEach( (item) =>{
						
						if (item.CAR_NAME.indexOf(v) > -1) {
							if (self.searchlist_car.indexOf(item.CAR_NAME) == -1) {
								self.searchlist_car.push(item.CAR_NAME);
							}
							ss.push(item);
						}
						this.result_car=ss
					});
				}

				this.tabdata_car = this.result_car; // 将过滤后的数据给了slist
			} else {
				// 没有搜索内容，则展示全部数据
				// this.setSlist(this.list);
				if(this.searchlist_car.length==0&&this.searchlist1_car.length==0){
					this.result_car=[];
					this.pageChange1_car(this.pageIndex_car);
					// console.log(this.show_list);
				}else if(this.searchlist_car.length==0&&this.searchlist1_car.length!=0){
					this.result_car=[];
					// console.log(se[0])
					this.search1_car();
				}
				else{
					this.tabdata_car = this.result_car;
				}
			}
		},	
		search1_car() {
			var v = this.va1_car,
			self = this;
			self.searchlist1_car = [];
			if (v) {
				
				// 过滤需要的数据
				if(this.result_car.length == 0){
				this.show_list_car.forEach( (item) =>{
					console.log(item.CAR_BELONG_COMPANY.indexOf(v));
					if (item.CAR_BELONG_COMPANY.indexOf(v) > -1) {
						if (self.searchlist1_car.indexOf(item.CAR_BELONG_COMPANY) == -1) {
							self.searchlist1_car.push(item.CAR_BELONG_COMPANY);
						}
						this.result_car.push(item);
					}
				});

				}else{
						var ss = [];
						this.result_car.forEach( (item) =>{
						if (item.CAR_BELONG_COMPANY.indexOf(v) > -1) {
							if (self.searchlist1_car.indexOf(item.CAR_BELONG_COMPANY) == -1) {
								self.searchlist1_car.push(item.CAR_BELONG_COMPANY);
							}
							ss.push(item);
						}
						this.result_car=ss
					});
				}
				this.tabdata_car = this.result_car; // 将过滤后的数据给了slist
			} else {
				// 没有搜索内容，则展示全部数据
				// this.setSlist(this.list);
				if(this.searchlist1_car.length==0&&this.searchlist_car.length==0){
					this.result_car=[];
					this.pageChange1_car(this.pageIndex_car);
					console.log(this.show_list_car);
				}
				else if(this.searchlist1_car.length==0&&this.searchlist_car.length!=0){
					this.result_car=[];
					// console.log(se[0])
					this.search_car();
				}
				else{
					this.tabdata_car = this.result_car;
				}
			}
		},
		pageChange1_car(pageIndex){
			console.log(pageIndex);
			this.pageIndex_car = pageIndex;
			this.gettabdata_car((pageIndex-1)*this.pageSize_car, pageIndex*this.pageSize_car); 
        },
        pageSizeChange1_car(pageSize){
			console.log(pageSize);
			this.pageSize_car = pageSize;
			this.pageIndex_car = 1;
			this.gettabdata_car(0,pageSize);
		},
		gettabdata_car(startindex, endindex){
			this.tabdata_car = this.show_list_car.slice(startindex, endindex);
		}


	},
	


}
</script>

<style scoped>
body,div,p,ul,li,dl,dt,dd,h1,a{
	margin: 0px;
	padding: 0px;
	
}

#left_content{
	float: left;
	width: 150px;
	height: 800px;
	background: #ffffff;
	/* margin-top: 65px; */
	text-align: center;
	background: #081832;
	box-shadow: -8px 0px 10px #034c6a inset, 8px 0px 10px #034c6a inset;
	/* background: #FF0000; */
}

#content{
	
	overflow: hidden;
	z-index: 1;
	/* margin-top: 58px; */
}
/* #clear{
	clear: both;
} */
#footer{
	text-align: center;
	background: #030829;
}
#footer a{
	text-decoration: none;
	color: white;
}
#nav1 li{
	padding: 15px;
	font-size: 15px;
	text-align: center;
	
}

#nav1 li a{
	height: 32px;
	text-decoration: none;
	/* border-radius:15px; */
	/* border:2px solid aqua; */
	color: #666666;
	text-align: center;
	
}
#nav1 li a input{
	vertical-align: middle;
	
}

#right{
	height: 800px;
	/* margin-top: 65px; */
	/* width：calc（100%-235px）； */
	width: calc(100% - 151px);
	float: right;
	/* overflow: hidden; */
	overflow: auto;
	background: #081832;
	/* box-shadow: -8px 0px 10px #034c6a inset, 8px 0px 10px #034c6a inset; */
}



#nav1 li:hover{
	background: #072951;
	box-shadow: -20px 0px 15px #034c6a inset, 0px -20px 15px #034c6a inset,20px 0px 15px #034c6a inset, 0px 20px 15px #034c6a inset;
}

/* 表格 */
[v-cloak] {
            display: none
}

#right table{

	border-collapse: collapse;
	box-shadow: -8px 0px 10px #034c6a inset, 8px 0px 10px #034c6a inset;

	margin: 0 auto;

	text-align: center;
	margin-top: 10px;
	/* margin-left: 2px;
	margin-right: 2px; */
	width:100%;
	font-size: 13px;
	border:none;
 }

#right table td, #right table th{

	color: white;
	height: 34px;
	text-align: center;
	border:solid #000 0px;

}

#right table th{

	width: 100px;
	color: #4b8df8;
	height: 40px;

}

#right table tr:nth-child(even){

	background-color: #072951;
  box-shadow: -10px 0px 15px #034c6a inset, 10px 0px 15px #034c6a inset;

}

.afcontain{
	/* width: 1000px; */
	font-size: 15px;
	font-family: 'Microsoft YaHei'
	

}
.afcontain .search {
	font-size: 15px;
	padding: 4px;
}
.afcontain .add {
	padding: 5px 15px;
}
.overlay {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 6;
	background: rgba(0, 0, 0, 0.7);
	
}
.overlay td:first-child {
	width: 80px;
	text-align: center;
}
.overlay .fhead{
	background: #d3d6dad4 !important; 
	height: 40px;
	color: black;
	margin-top: 0px
}
.overlay .title{
	color: black;
	font-size: 16px;
	margin-left: 20px;
	margin-top: 15px
}
.overlay .lab{
	background-color: #eeeeee3b;
  border: 1px solid #cccccc	
}
.overlay .con {
	position: absolute;
	width: 320px;
	min-height: 280px;
	/* background: #fff; */
	left: 50%;
	top: 50%;
	-webkit-transform: translate3d(-50%, -50%, 0);
	transform: translate3d(-50%, -50%, 0);
	/*margin-top: -150px;*/
	/* padding: 20px; */
	background:white;
	/* background-color: #7a8da0 */
}

.overlay .con1 {
	position: absolute;
	width: 350px;
	min-height: 400px;
	/* background: #fff; */
	left: 50%;
	top: 50%;
	-webkit-transform: translate3d(-50%, -50%, 0);
	transform: translate3d(-50%, -50%, 0);
	/*margin-top: -150px;*/
	/* padding: 20px; */
	background:white;
	/* background-color: #7a8da0 */
}
.overlay table{
	margin-left: 20px;
	margin-top: 30px;

}
.overlay table tr{
	height: 34px;
	font-size: 14px;
	color: black;
	width: 100%;
}
.overlay table tr input,select{
	height: 34px;
	font-size: 14px;
	color: black;
	padding-left: 26px;
	width: 198px;
	/* width: 100%; */
}
.overlay .but1{
	font-size: 15px;
	/* margin-left: 20px; */
	background-color: #00B83F;
	border-radius: 5px;
	color: white;
		width: 60px;
  height: 30px;
	border: none;
	margin-left: 5px;
}
.overlay .but2{
	font-size: 15px;
	color: white;
	/* margin-left: 20px; */
	background-color: orangered;
	border-radius: 5px;
	width: 60px;
  height: 30px;
  border: none;
}
.nav_image{
	vertical-align:middle;
	float: right;

	}
</style>

