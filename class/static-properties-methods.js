// 정적 메서드(static method)
// prototype이 아닌 클래스 함수 자체에 설정하는 메서드
// 어떤 특정 객체가 아닌 클래스에 속함 함수를 구현하고자 할 때 주로 사용됨
class User {
    static staticMethod() { // static 키워드를 붙여 정적메서드 만들기
        console.log(this === User);
    }
}

// 메서드를 프로퍼티 형태로 직접 할당
User.staticMethod2 = function() {
    console.log(this === User);
};

// 둘 다 결과가 동일함
User.staticMethod(); // true
User.staticMethod2(); // true


// 정적메서드 활용 예제
class Article {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }

  static compare(articleA, articleB) {
    return articleA.date - articleB.date;
  }
  
  // Today's digest라는 제목의 현재 Date로 article 인스턴스를 만드는 팩토리 메서드
  static createTodays() { 
    return new this("Today's digest", new Date());
  }
}

let articles = [
  new Article("HTML", new Date(2019, 1, 1)),
  new Article("CSS", new Date(2019, 0, 1)),
  new Article("JavaScript", new Date(2019, 11, 1))
];

// 정적 메서드 Article.compare로 Article 인스턴스의 date 비교
articles.sort(Article.compare);

console.log( articles[0].title ); // CSS

let article = Article.createTodays();

console.log(article.title); // Today's digest

// 정적 프로퍼티(static property) 예제
class Article2 {
    // 앞에 static 키워드를 붙임
    static publisher = "Ilya Kantor";
}

Article2.publisher2 = "Ilya Knator"; // static 키워드를 붙여 프로퍼티를 할당하는 것과 동일

// 정적 메서드와 정적 프로퍼티는 상속됨