#define PWM1 44
#define DIR1 40

#define PWM2 46
#define DIR2 42

#define PWM3 3
#define DIR3 2

#define PWM4 5
#define DIR4 4

unsigned int speed1 = 0, speed2 = 0, speed3 = 0, speed4 = 0, current = 0, maxStraightPWM = 100, maxTurnPWM = 80, input = 0;
char in;

void setup() {
    Serial.begin(9600);
    pinMode(DIR1, OUTPUT);
    pinMode(DIR2, OUTPUT);
    pinMode(DIR3, OUTPUT);
    pinMode(DIR4, OUTPUT);
    digitalWrite(DIR1, LOW);
    digitalWrite(DIR2, LOW);
    digitalWrite(DIR3, LOW);
    digitalWrite(DIR4, LOW);
}

void loop() {
    if (Serial.available() > 0) {
        input = 0;
        bool straightPWM = true;
        while (1) {
            in = Serial.read();
            if (in == 's') {
                continue;
            } else if (in == 't') {
                straightPWM = false;
                continue;
            } else if (in == '\n') {
                break;
            } else if (in == -1) {
                continue;
            }
            input *= 10;
            input += (in - 48);
        }
        if (input == 0) {
            while (speed1 || speed2 || speed3 || speed4) {
                if (speed1 > 0) {
                    if (speed1 > 20) {
                        speed1 -= 20;
                    } else if (speed1) {
                        speed1 = 0;
                    }
                }
                if (speed2) {
                    if (speed2 > 20) {
                        speed2 -= 20;
                    } else if (speed2) {
                        speed2 = 0;
                    }
                }
                if (speed3) {
                    if (speed3 > 20) {
                        speed3 -= 20;
                    } else if (speed3) {
                        speed3 = 0;
                    }
                }
                if (speed4) {
                    if (speed4 > 20) {
                        speed4 -= 20;
                    } else if (speed4) {
                        speed4 = 0;
                    }
                }
                analogWrite(PWM1, speed1);
                analogWrite(PWM2, speed2);
                analogWrite(PWM3, speed3);
                analogWrite(PWM4, speed4);
                delay(50);
            }
        } else if (input == 8) {
            if (current != 8) {
                current = 8;
                while (speed1 || speed2 || speed3 || speed4) {
                    if (speed1 > 0) {
                        if (speed1 > 15) {
                            speed1 -= 15;
                        } else if (speed1) {
                            speed1 = 0;
                        }
                    }
                    if (speed2) {
                        if (speed2 > 15) {
                            speed2 -= 15;
                        } else if (speed2) {
                            speed2 = 0;
                        }
                    }
                    if (speed3) {
                        if (speed3 > 15) {
                            speed3 -= 15;
                        } else if (speed3) {
                            speed3 = 0;
                        }
                    }
                    if (speed4) {
                        if (speed4 > 15) {
                            speed4 -= 15;
                        } else if (speed4) {
                            speed4 = 0;
                        }
                    }
                    analogWrite(PWM1, speed1);
                    analogWrite(PWM2, speed2);
                    analogWrite(PWM3, speed3);
                    analogWrite(PWM4, speed4);
                    delay(50);
                }
                digitalWrite(DIR1, LOW);
                digitalWrite(DIR2, LOW);
                digitalWrite(DIR3, LOW);
                digitalWrite(DIR4, LOW);
            }
            speed1 = speed2 = speed3 = speed4 = 30;
            analogWrite(PWM1, speed1);
            analogWrite(PWM2, speed2);
            analogWrite(PWM3, speed3);
            analogWrite(PWM4, speed4);
            while (speed1 < maxStraightPWM || speed2 < maxStraightPWM || speed3 < maxStraightPWM || speed4 < maxStraightPWM) {
                if (speed1 < maxStraightPWM) {
                    speed1 += 15;
                } else if (speed1 != maxStraightPWM) {
                    speed1 = maxStraightPWM;
                }
                if (speed2 < maxStraightPWM) {
                    speed2 += 15;
                } else if (speed2 != maxStraightPWM) {
                    speed2 = maxStraightPWM;
                }
                if (speed3 < maxStraightPWM) {
                    speed3 += 15;
                } else if (speed3 != maxStraightPWM) {
                    speed3 = maxStraightPWM;
                }
                if (speed4 < maxStraightPWM) {
                    speed4 += 15;
                } else if (speed4 != maxStraightPWM) {
                    speed4 = maxStraightPWM;
                }
                analogWrite(PWM1, speed1);
                analogWrite(PWM2, speed2);
                analogWrite(PWM3, speed3);
                analogWrite(PWM4, speed4);
                delay(50);
            }
        } else if (input == 6) {
            if (current != 6) {
                current = 6;
                while (speed1 || speed2 || speed3 || speed4) {
                    if (speed1 > 0) {
                        if (speed1 > 15) {
                            speed1 -= 15;
                        } else if (speed1) {
                            speed1 = 0;
                        }
                    }
                    if (speed2) {
                        if (speed2 > 15) {
                            speed2 -= 15;
                        } else if (speed2) {
                            speed2 = 0;
                        }
                    }
                    if (speed3) {
                        if (speed3 > 15) {
                            speed3 -= 15;
                        } else if (speed3) {
                            speed3 = 0;
                        }
                    }
                    if (speed4) {
                        if (speed4 > 15) {
                            speed4 -= 15;
                        } else if (speed4) {
                            speed4 = 0;
                        }
                    }
                    analogWrite(PWM1, speed1);
                    analogWrite(PWM2, speed2);
                    analogWrite(PWM3, speed3);
                    analogWrite(PWM4, speed4);
                    delay(50);
                }
                digitalWrite(DIR1, HIGH);
                digitalWrite(DIR2, LOW);
                digitalWrite(DIR3, LOW);
                digitalWrite(DIR4, HIGH);
            }
            speed1 = speed2 = speed3 = speed4 = 30;
            analogWrite(PWM1, speed1);
            analogWrite(PWM2, speed2);
            analogWrite(PWM3, speed3);
            analogWrite(PWM4, speed4);
            while (speed1 < maxTurnPWM || speed2 < maxTurnPWM || speed3 < maxTurnPWM || speed4 < maxTurnPWM) {
                if (speed1 < maxTurnPWM) {
                    speed1 += 15;
                } else if (speed1 != maxTurnPWM) {
                    speed1 = maxTurnPWM;
                }
                if (speed2 < maxTurnPWM) {
                    speed2 += 15;
                } else if (speed2 != maxTurnPWM) {
                    speed2 = maxTurnPWM;
                }
                if (speed3 < maxTurnPWM) {
                    speed3 += 15;
                } else if (speed3 != maxTurnPWM) {
                    speed3 = maxTurnPWM;
                }
                if (speed4 < maxTurnPWM) {
                    speed4 += 15;
                } else if (speed4 != maxTurnPWM) {
                    speed4 = maxTurnPWM;
                }
                analogWrite(PWM1, speed1);
                analogWrite(PWM2, speed2);
                analogWrite(PWM3, speed3);
                analogWrite(PWM4, speed4);
                delay(50);
            }
        } else if (input == 4) {
            if (current != 4) {
                current = 4;
                while (speed1 || speed2 || speed3 || speed4) {
                    if (speed1 > 0) {
                        if (speed1 > 15) {
                            speed1 -= 15;
                        } else if (speed1) {
                            speed1 = 0;
                        }
                    }
                    if (speed2) {
                        if (speed2 > 15) {
                            speed2 -= 15;
                        } else if (speed2) {
                            speed2 = 0;
                        }
                    }
                    if (speed3) {
                        if (speed3 > 15) {
                            speed3 -= 15;
                        } else if (speed3) {
                            speed3 = 0;
                        }
                    }
                    if (speed4) {
                        if (speed4 > 15) {
                            speed4 -= 15;
                        } else if (speed4) {
                            speed4 = 0;
                        }
                    }
                    analogWrite(PWM1, speed1);
                    analogWrite(PWM2, speed2);
                    analogWrite(PWM3, speed3);
                    analogWrite(PWM4, speed4);
                    delay(50);
                }
                digitalWrite(DIR1, LOW);
                digitalWrite(DIR2, HIGH);
                digitalWrite(DIR3, HIGH);
                digitalWrite(DIR4, LOW);
            }
            speed1 = speed2 = speed3 = speed4 = 30;
            analogWrite(PWM1, speed1);
            analogWrite(PWM2, speed2);
            analogWrite(PWM3, speed3);
            analogWrite(PWM4, speed4);
            while (speed1 < maxTurnPWM || speed2 < maxTurnPWM || speed3 < maxTurnPWM || speed4 < maxTurnPWM) {
                if (speed1 < maxTurnPWM) {
                    speed1 += 15;
                } else if (speed1 != maxTurnPWM) {
                    speed1 = maxTurnPWM;
                }
                if (speed2 < maxTurnPWM) {
                    speed2 += 15;
                } else if (speed2 != maxTurnPWM) {
                    speed2 = maxTurnPWM;
                }
                if (speed3 < maxTurnPWM) {
                    speed3 += 15;
                } else if (speed3 != maxTurnPWM) {
                    speed3 = maxTurnPWM;
                }
                if (speed4 < maxTurnPWM) {
                    speed4 += 15;
                } else if (speed4 != maxTurnPWM) {
                    speed4 = maxTurnPWM;
                }
                analogWrite(PWM1, speed1);
                analogWrite(PWM2, speed2);
                analogWrite(PWM3, speed3);
                analogWrite(PWM4, speed4);
                delay(50);
            }
        } else if (input == 5) {
            if (current != 5) {
                current = 5;
                while (speed1 || speed2 || speed3 || speed4) {
                    if (speed1 > 0) {
                        if (speed1 > 15) {
                            speed1 -= 15;
                        } else if (speed1) {
                            speed1 = 0;
                        }
                    }
                    if (speed2) {
                        if (speed2 > 15) {
                            speed2 -= 15;
                        } else if (speed2) {
                            speed2 = 0;
                        }
                    }
                    if (speed3) {
                        if (speed3 > 15) {
                            speed3 -= 15;
                        } else if (speed3) {
                            speed3 = 0;
                        }
                    }
                    if (speed4) {
                        if (speed4 > 15) {
                            speed4 -= 15;
                        } else if (speed4) {
                            speed4 = 0;
                        }
                    }
                    analogWrite(PWM1, speed1);
                    analogWrite(PWM2, speed2);
                    analogWrite(PWM3, speed3);
                    analogWrite(PWM4, speed4);
                    delay(50);
                }
                digitalWrite(DIR1, HIGH);
                digitalWrite(DIR2, HIGH);
                digitalWrite(DIR3, HIGH);
                digitalWrite(DIR4, HIGH);
            }
            speed1 = speed2 = speed3 = speed4 = 30;
            analogWrite(PWM1, speed1);
            analogWrite(PWM2, speed2);
            analogWrite(PWM3, speed3);
            analogWrite(PWM4, speed4);
            while (speed1 < maxStraightPWM || speed2 < maxStraightPWM || speed3 < maxStraightPWM || speed4 < maxStraightPWM) {
                if (speed1 < maxStraightPWM) {
                    speed1 += 15;
                } else if (speed1 != maxStraightPWM) {
                    speed1 = maxStraightPWM;
                }
                if (speed2 < maxStraightPWM) {
                    speed2 += 15;
                } else if (speed2 != maxStraightPWM) {
                    speed2 = maxStraightPWM;
                }
                if (speed3 < maxStraightPWM) {
                    speed3 += 15;
                } else if (speed3 != maxStraightPWM) {
                    speed3 = maxStraightPWM;
                }
                if (speed4 < maxStraightPWM) {
                    speed4 += 15;
                } else if (speed4 != maxStraightPWM) {
                    speed4 = maxStraightPWM;
                }
                analogWrite(PWM1, speed1);
                analogWrite(PWM2, speed2);
                analogWrite(PWM3, speed3);
                analogWrite(PWM4, speed4);
                delay(50);
            }
        } else {
            if (straightPWM) {
                maxStraightPWM = input;
            } else {
                maxTurnPWM = input;
            }
        }
    }
}
