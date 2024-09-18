import request from '@/utils/request'
import service from '@/utils/request';

export function addtask(data) {
    return request({
        url: '/task/add',
        method: 'post',
        data
    })
}

export function getTask(data) {
    return request({
        url: '/task/query',
        method: 'post',
        data
    })
}

export function delTask(data) {
    return request({
        url: '/task/delete',
        method: 'post',
        data
    })
}

export function cancelTask(data) {
    return request({
        url: '/task/cancel',
        method: 'post',
        data
    })
}

export function runTask(data) {
    return request({
        url: '/task/run',
        method: 'post',
        data
    })
}

export function uncertaintyConfig(data) {
    return request({
        url: '/task/config/Uncertainty',
        method: 'post',
        data
    })
}

export function conditionConfig(data) {
    return request({
        url: '/task/config/Condition',
        method: 'post',
        data
    })
}

export function vulnerabilityConfig(data) {
    return request({
        url: '/task/config/Vulnerability',
        method: 'post',
        data
    })
}

export function resultDownload(data) {
    return service.get('/task/download', {
        params: data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        }
    });
    // return request({
    //     url: '/task/download',
    //     method: 'get',
    //     responseType: 'blob',
    //     params: data
        
    // })
}

export function taskConfig(data) {
    return request({
        url: '/task/queryConfig',
        method: 'post',
        data
    })
}