int pwm1 = 7;
int pwm2 = 6;
int pwm3 = 8;
int pwm4 = 9;
int pwm5 = 45;
int pwm6 = 3;
int br1 = 34;
int br2 = 30;
int br3 = 22;
int br4 = 23;
int br5 = 43;
int br6 = 33;
int dir1 = 32;
int dir2 = 28;
int dir3 = 24;
int dir4 = 25;
int dir5 = 41;
int dir6 = 31;
String bruh="1";
unsigned long n;int sp=0;
void setup() 
{
  pinMode(pwm1,OUTPUT);
  pinMode(pwm2,OUTPUT);
  pinMode(pwm3,OUTPUT);
  pinMode(pwm4,OUTPUT);
  pinMode(pwm5,OUTPUT);
  pinMode(pwm6,OUTPUT);
  pinMode(br1,OUTPUT);
  pinMode(br2,OUTPUT);
  pinMode(br3,OUTPUT);
  pinMode(br4,OUTPUT);
  pinMode(br5,OUTPUT);
  pinMode(br6,OUTPUT);
  pinMode(dir1,OUTPUT);
  pinMode(dir2,OUTPUT);
  pinMode(dir3,OUTPUT);
  pinMode(dir4,OUTPUT);
  pinMode(dir5,OUTPUT);
  pinMode(dir6,OUTPUT);
  Serial.begin(9600); 
}

int kiminookaasan; // stores pwm value
void urdadlesbo2(int d, int p,int sexibish) //sexibish stores motor number
{
  n=n/2;
  if(sexibish==1)
  {
    if(n%2==1)
      {
        digitalWrite(d,HIGH);
      }
      else
      {
        digitalWrite(d,LOW);
      }
      kiminookaasan=40;
  }
  else if(sexibish==2)
  {
    if(n%2==1)//Sets the direction
      {
        digitalWrite(d,HIGH);
        kiminookaasan=120;
      }
      else
      {
        digitalWrite(d,LOW);
        kiminookaasan=100;
      }
  }
  else if(sexibish==3)
  {
    if(n%2==1)
      {
        digitalWrite(d,HIGH);
        kiminookaasan=100;
      }
      else
      {
        digitalWrite(d,LOW);
        kiminookaasan=100;
      }
  }
  else if(sexibish==4)
  {
    if(n%2==1)
      {
        digitalWrite(d,HIGH);
        kiminookaasan=80;
      }
      else
      {
        digitalWrite(d,LOW);
        kiminookaasan=70;
      }
  }
  else if(sexibish==5)
   {
    if(n%2==1)
      {
        digitalWrite(d,HIGH);
        kiminookaasan=80;
      }
      else
      {
        digitalWrite(d,LOW);
        kiminookaasan=60;
      }
   }
  else if(sexibish==6)
   {
    if(n%2==1)
      {
        digitalWrite(d,HIGH);
        kiminookaasan=80;
      }
      else
      {
        digitalWrite(d,LOW);
        kiminookaasan=60;
      }
   }
   analogWrite(p,kiminookaasan);
}
void loop()
{ 
  if(Serial.available())
  {
    bruh =Serial.readString();
  }
  n=bruh.toInt();
    if(n%2==1)
    {
      digitalWrite(br1,HIGH);
      digitalWrite(br2,HIGH);
      digitalWrite(br3,HIGH);
      digitalWrite(br4,HIGH);
      digitalWrite(br5,HIGH);
      digitalWrite(br6,HIGH);
    }
    else
    {
      n=n/2;
      if(n%2==1)
      {
        digitalWrite(br1,HIGH);
        n=n/2;
      }
      else
      {
        digitalWrite(br1,LOW);
        urdadlesbo2(dir1,pwm1,1);
      }
      n=n/2;
      if(n%2==1)
      {
        digitalWrite(br2,HIGH);
        n=n/2;
      }
      else
      {
        digitalWrite(br2,LOW);
        urdadlesbo2(dir2,pwm2,2);
      }
      n=n/2;
      if(n%2==1)
      {
        digitalWrite(br3,HIGH);
        n=n/2;
      }
      else
      {
        digitalWrite(br3,LOW);
        urdadlesbo2(dir3,pwm3,3);
      }
      n=n/2;
      if(n%2==1)
      {
        digitalWrite(br4,HIGH);
        n=n/2;
      }
      else
      {
        digitalWrite(br4,LOW);
        urdadlesbo2(dir4,pwm4,4);
      }
      n=n/2;
      if(n%2==1)
      {
        digitalWrite(br5,HIGH);
        n=n/2;
      }
      else
      {
        digitalWrite(br5,LOW);
        urdadlesbo2(dir5,pwm5,5);
      }
      n=n/2;
      if(n%2==1)
      {
        digitalWrite(br6,HIGH);
      }
      else
      {
        digitalWrite(br6,HIGH);
        urdadlesbo2(dir6,pwm6,6);
      }  
    }
}

/*  Every 2 bit for a motor(Direction Break)
 *  Speed -> 1 is high and 0 is low
 *  Direction -> 0 is forward/down/clockwise and 1 is backward/up/anti-clockwise
 *  Break -> 1 is stop and 0 is continue
Elbow up - 
Elbow down - 
Shoulder forward  – 
Shoulder backward - 
Turn table clockwise – 
Turn table anti-clockwise  – 



*/

