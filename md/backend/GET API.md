# GET API

## GetMapping > @PathVariable

```java
// http://localhost:8080/api/v1/get-api/variable1/{String 값}
@GetMapping("/variable1/{variable}")
public String getVariable1(@PathVariable String variable){return variable}

@GetMapping("/variable2/{variable}")
public String getVariable2(@PathVariable("variable") String var){return var}
```

## GetMapping > @RequsetParam

```java
// http://localhost:8080/api/v1/get-api/request1?name=test&email=hi.test@gmail.com&organization=test
@GetMapping("/requset1")
public String getRequsetParam1(@RequsetParam String name, @RequsetParam String email, @RequsetParam String organization){
    return name + " " + email + " " + oorganization;
}
```

```java
// GetMapping > @RequsetParam > Map
// http://localhost:8080/api/v1/get-api/request2?key1=value1&key2=value2&key3=value3
@GetMapping("/requset2")
public String getRequsetParam2(@RequsetParam Map<String, String> param){
    StringBuilder sb = new StringBuilder();
    param.entrySet().forEach(map -> {
        sb.append(map.getKey() + " " + map.getValue() + "\n");
    })
    // param.forEach((key, value) -> sb.append(key).append(" : ").append(value).append("\n"));
    return sb.toString();
}
```

## GetMApping > @DTO

```java
// http://localhost:8080/api/v1/get-api/requset3?name=tester&email=lc.test@gmeil.com&nickname=test
@GetMapping("/requset3")
public String getRequsetParam3(MemberDTO memberDTO){
    return memberDTO.toString();
}
```
