#_*_coding: utf-8 _*_
from django.http import HttpResponse
from django.shortcuts import render_to_response
from django.views.decorators.csrf import csrf_exempt
import json
import urllib
import os

def getPanoDepth(request):

	return render_to_response('main.html' , locals())

@csrf_exempt
def dataSave(request):
    if request.is_ajax():
        if request.method == 'POST':
			json_data = urllib.unquote(request.body)
			#decode_data = json.loads(json_data)
			datadir = "Data/" + request.META['HTTP_DATADIR']
			if not os.path.exists(datadir):
				os.makedirs(datadir)
			fo = open("{0}/{1}".format(datadir,request.META['HTTP_DATANAME']) , "wb")
			fo.write(json_data)
			fo.close
			return HttpResponse("OK")
	else :
		return HttpResponse("BAD_REQUEST")

@csrf_exempt
def depthMapSave(request):
    if request.is_ajax():
        if request.method == 'POST':
			json_data = urllib.unquote(request.body)
			#decode_data = json.loads(json_data)
			datadir = "Data/" + request.META['HTTP_DATADIR']
			if not os.path.exists(datadir):
				os.makedirs(datadir)
			fo = open("{0}/{1}".format(datadir,request.META['HTTP_DATANAME']) , "wb")
			fo.write(json_data)
			fo.close
			return HttpResponse("OK")
	else :
		return HttpResponse("BAD_REQUEST")