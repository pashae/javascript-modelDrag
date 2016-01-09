function getByClass(clsName,parent) {
	//����һ�����ٲ����н�����ĺ���
	//����ȡ���ض�id�µ�ĳ��������Ԫ��
  var oParent=parent?document.getElementById(parent):document,
      eles=[],
      elements=oParent.getElementsByTagName('*');

  for(var i=0,l=elements.length;i<l;i++){
    if(elements[i].className==clsName){
      eles.push(elements[i]);
    }
  }
  return eles;
}

window.onload = drag;
//�����ק����
function drag() {
	var oTitle = getByClass("login_logo_webqq","loginPanel")[0];
	//�����갴���¼���ʵ����ק
	oTitle.onmousedown = fnDown;
	//��ӹر��¼�
	var oClose = document.getElementById("ui_boxyClose");
	oClose.onclick = function() {
		document.getElementById("loginPanel").style.display = "none";
	}
	//�л�״̬
	var loginState = document.getElementById("loginState");
	var stateList = document.getElementById("loginStatePanel");
	var list = stateList.getElementsByTagName("li");
	var stateTxt = document.getElementById("login2qq_state_txt");
	var loginStateShow = document.getElementById("loginStateShow");
	
	//���״̬������ʾ����״̬
	loginState.onclick = function(event) {
		//����Ҫ��ֹð��
		event = event || window.event;
		if(event.stopPropagation) {
			//��IE�ں�
			event.stopPropagation();
		}else {
			event.cancelBubble = true;
		}
		stateList.style.display = "block";
	}
	
	//��껬�����뿪�͵��״̬�б�ʱ�ķ���
	for(var i=0,l=list.length;i<l;i++) {
		//��껬��
		list[i].onmouseover = function() {
			this.style.background = "#567";
		}
		//����뿪
		list[i].onmouseout = function() {
			this.style.background = "#FFF";
		}
		//�����
		list[i].onclick = function(event) {
			//��ֹð���¼��ķ���
			event = event || window.event;
			if(event.stopPropagation) {
				//��IE�ں�
				event.stopPropagation();
			}else {
				event.cancelBubble = true;
			}

			var oId = this.id;
			stateList.style.display = "none";
			stateTxt.innerHTML = getByClass("stateSelect_text",oId)[0].innerHTML;
			loginStateShow.className = "";
			loginStateShow.className = "login-state-show " + oId;
		}
	}
	document.onclick = function() {
		stateList.style.display = "none";
	}
}
//��갴�º���
function fnDown(event) {
	event = event || window.event;
	var oDrag = document.getElementById("loginPanel");
	//����һ������BUG�����ת�ƾ���
	var translateX = event.clientX - oDrag.offsetLeft;
	var translateY = event.clientY - oDrag.offsetTop;
	//�ƶ�
	document.onmousemove = function(event) {
		event = event || window.event;
		fnMove(event,translateX,translateY);
	}
	//�ͷ�
	document.onmouseup = function() {
		document.onmousemove = null;
		document.onmouseup = null;
	}
}
//����ƶ�����
function fnMove(e,posX,posY) {
	var l = e.clientX - posX;
	var t = e.clientY - posY;
	var oDrag = document.getElementById("loginPanel");
	//������������������ģ����϶���Χ
	var winW = document.documentElement.clientWidth || document.body.clientWidth;
	var winH = document.documentElement.clientHeight || document.body.clientHeight;
	//������ֵ���������10����Ϊ����ʽ�������У�Ϊ�رհ�ť������left:-10px top:-10px
	//Ϊ�˱�֤���϶��Ĺ����в������������������󣬹���Ҫ���ƶ��ľ�������ʵ�������
	var maxW = winW - oDrag.offsetWidth - 10;
	var maxH = winH - oDrag.offsetHeight;
	if(l<0) {
		l = 0;
	}else if(l>maxW) {
		l = maxW;
	}
	if(t<0) {
		t = 10;
	}else if(t>maxH) {
		t = maxH;
	}
	oDrag.style.left = l + "px";
	oDrag.style.top = t + "px";
}