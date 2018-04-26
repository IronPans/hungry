let watchID, position;

function success(pos) {
    const coords = pos.coords;
    const lat = coords.latitude;
    const lng = coords.longitude;
    let country, province, city;
    //只有firefox支持address属性
    if (typeof pos.address !== "undefined") {
        country = pos.address.country;
        province = pos.address.region;
        city = pos.address.city;
    }
}
function error(error) {
    let message = '';
    switch (error.code) {
        case error.TIMEOUT:
            message = "连接超时，请重试";
            break;
        case error.PERMISSION_DENIED:
            message = "您拒绝了使用位置共享服务，查询已取消";
            break;
        case error.POSITION_UNAVAILABLE:
            message = "亲，非常抱歉，我们暂时无法为您提供位置服务";
            break;
    }
    console.warn(message);
    return error;
}

export const getLocation = (watch, cb) => {
    let message = '';
    if ("geolocation" in navigator) {
        const options = {
            //enableHighAccuracy: true,
            //maximumAge: 30000,
            timeout: 27000
        };
        navigator.geolocation.getCurrentPosition((position) => {
            success(position);
            cb(position);
        }, error, options);
        if (watch) {
            watchID = navigator.geolocation.watchPosition((position) => {
                success(position);
                cb(position);
            }, error, options);
        }
    } else {
        message = "您的浏览器不支持定位！";
        console.warn(message);
    }
};

export const getJsonp = (url) => {
    const script = document.createElement('script');
    script.onload = () => {
    };
    script.onerror = (err) => {
        console.log(err);
    };
    script.src = url;
    document.body.appendChild(script);
    return script;
};

export const removeScript = (script) => {
    if (script) {
        document.body.removeChild(script);
    }
};

export const clearWatch = () => {
    navigator.geolocation.clearWatch(watchID);
};