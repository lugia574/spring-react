# API Param, query Handle

## GET API

### GetMapping > @PathVariable

```java
// http://localhost:8080/api/v1/get-api/variable1/{String 값}
@GetMapping("/variable1/{variable}")
public String getVariable1(@PathVariable String variable){return variable}

@GetMapping("/variable2/{variable}")
public String getVariable2(@PathVariable("variable") String var){return var}
```

### GetMapping > @RequsetParam

```java
// http://localhost:8080/api/v1/get-api/request1?name=test&email=hi.test@gmail.com&organization=test
@GetMapping("/request1")
public String getRequestParam1(@RequsetParam String name, @RequsetParam String email, @RequsetParam String organization){
    return name + " " + email + " " + oorganization;
}
```

```java
// GetMapping > @RequsetParam > Map
// http://localhost:8080/api/v1/get-api/request2?key1=value1&key2=value2&key3=value3
@GetMapping("/request2")
public String getRequestParam2(@RequsetParam Map<String, String> param){
    StringBuilder sb = new StringBuilder();
    param.entrySet().forEach(map -> {
        sb.append(map.getKey() + " " + map.getValue() + "\n");
    })
    // param.forEach((key, value) -> sb.append(key).append(" : ").append(value).append("\n"));
    return sb.toString();
}
```

### GetMapping > @DTO

```java
// http://localhost:8080/api/v1/get-api/requset3?name=tester&email=lc.test@gmeil.com&nickname=test
@GetMapping("/request3")
public String getRequestParam3(MemberDTO memberDTO){
    return memberDTO.toString();
}
```

## POST API

### POSTMapping > @RequestBody (Map)

```java
@PostMapping("/member")
public String postMember(@RequestBody Map<String, Object> postData){
    StringBuilder sb = new StringBuilder();
    // 포이치로 조져

    return sb.toString();
}
```
