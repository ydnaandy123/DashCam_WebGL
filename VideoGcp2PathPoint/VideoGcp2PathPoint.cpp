#include <stdio.h>
#define DATANUM 5
FILE *fp_label, *fp_gcp, *fp_path, *fp_pathItp;
int pathNum=0;
char buff[1024], diction[DATANUM*100][1024];
bool matchError=0;
int main(void)
{
    int i;
    fp_label = fopen("../src/VideoSource/label/label_0M3Uuqw0Gn8_checked.txt","r");
    fp_gcp = fopen("../src/VideoSource/GT_gcp/for_vsfm_GT_0M3Uuqw0Gn8.gcp","r");
    if(fp_label==NULL || fp_gcp==NULL){
        printf("file is NULL.");
        return 0;
    }
    while(fscanf(fp_gcp,"%s",diction[DATANUM*pathNum])!=EOF){
        printf("%s ",diction[DATANUM*pathNum]); // image_id
        fscanf(fp_gcp,"%s",diction[DATANUM*pathNum+1]);
        printf("%s ", diction[DATANUM*pathNum+1]); // lan
        fscanf(fp_gcp,"%s",diction[DATANUM*pathNum+2]);
        printf("%s ", diction[DATANUM*pathNum+2]); //lon
        fscanf(fp_gcp,"%s",diction[DATANUM*pathNum+3]);
        printf("%s ", diction[DATANUM*pathNum+3]); // 0?
        if(fscanf(fp_label,"%s",diction[DATANUM*pathNum+4])==EOF){
            matchError=1; break;
        }
        printf("%s\n",diction[DATANUM*pathNum+4]); // pano_id
        fscanf(fp_label,"%s",buff); //image_id
        pathNum++;
    }
    fclose(fp_label);
    fclose(fp_gcp);
    if(pathNum>0){
        fp_path = fopen("../src/VideoSource/jsPathPoint/pathPoint.js","w");
        fprintf(fp_path,"pathPoint=[");
        fprintf(fp_path,"%s,%s",diction[1],diction[2]);
        for(i=1;i<pathNum;i++){
            fprintf(fp_path,",%s,%s",diction[DATANUM*i+1],diction[DATANUM*i+2]);
        }
        fprintf(fp_path,"];");
    }
    fclose(fp_path);
    return 0;
}
