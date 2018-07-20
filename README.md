# DudiTV

## Prepare media
Download raspbian stretch lite from https://www.raspberrypi.org/downloads/raspbian/, and install on your sd card

## Configure raspbian 

In this example /boot is mounted on a mac at /Volumes/boot. Replace WIFINAME, WIFIPW & MPEG2LICENSE with your own values
 
```bash

# enable ssh
touch /Volumes/boot/ssh

# enable wifi
echo "ctrl_interface=DIR=/var/run/wpa_supplicant GROUP=netdev
update_config=1
country=DK

network={
ssid=\"WIFINAME\"
psk=\"WIFIPW\"
key_mgmt=WPA-PSK
}" > /Volumes/boot/wpa_supplicant.conf

echo "disable_splash=1
decode_MPG2=MPEG2LICENSE" >> /Volumes/boot/config.conf

echo "$(sed 's/tty1/tty3/' /Volumes/boot/cmdline.txt) quiet splash loglevel=0 logo.nologo" >> /Volumes/boot/cmdline.txt

```

## install packages
Once booted run the following and answer yes to nodm

```bash

# node
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -

# packages for x
sudo apt-get -y update
sudo apt-get -y install git nodejs vim omxplayer libgtk3.0-0 libxss1 libgconf-2-4 libnss3 libxtst6 xinit nodm cec-utils

echo "cd duditv
exec npm start" > ~/.xinitrc
chmod +x . ~/.xinitrc

# auto login
echo "NODM_ENABLED=true
NODM_USER=pi
NODM_FIRST_VT=7
NODM_XSESSION=/home/pi/.xinitrc
NODM_OPTIONS=
NODM_X_OPTIONS='-nolisten tcp -nocursor -s 0 dpms'
NODM_MIN_SESSION_TIME=60
NODM_X_TIMEOUT=300" | sudo tee /etc/default/nodm

# cloning repo
git clone https://github.com/dhojelsen/duditv.git
cd duditv
npm install


```


