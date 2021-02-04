/*
  Airy function Ai(z)
  https://en.wikipedia.org/wiki/Airy_function
  Written by Juan Carlos Ponce Campuzano
  https://jcponce.github.io/
  https://mathcell.org/
  04 Feb 2021
*/

var parent = document.currentScript.parentNode;

var id = generateId();
parent.id = id;

MathCell(id, [{
  type: 'buttons',
  values: ['abs', 're', 'im'],
  default: 'abs',
  width: '0.5in',
  name: 'opt',
  label: 'Plotting option:'
}]);

parent.update = function (id) {

  var opt = getVariable(id, 'opt');
  var go = (x, y) => {
    var term1 = complex(0, 0);
    var term2 = complex(0, 0);
    var cnt = inv(mul(pow(complex(3, 0), complex(2 / 3, 0)), gamma(complex(2 / 3, 0))));
    var vcnt = div(complex(x, y), mul(pow(complex(3, 0), complex(1 / 3, 0)), gamma(complex(1 / 3, 0))));
    for (var n = 0; n <= 17; ++n) {


      nextTerm1 = div(
        pow(mul(complex(1 / 9, 0), pow(complex(x, y), complex(3, 0))), complex(n, 0)),
        mul(
          div(gamma(add(complex(2 / 3, 0), complex(n, 0))),
            gamma(complex(2 / 3, 0))
          ),
          gamma(add(complex(n, 0), complex(1, 0)))
        )
      );

      nextTerm2 = div(
        pow(mul(complex(1 / 9, 0), pow(complex(x, y), complex(3, 0))), complex(n, 0)),
        mul(
          div(gamma(add(complex(4 / 3, 0), complex(n, 0))),
            gamma(complex(4 / 3, 0))
          ),
          gamma(add(complex(n, 0), complex(1, 0)))
        )
      );


      //next = pow(complex(x,y), n)

      term1 = add(term1, nextTerm1);
      term2 = add(term2, nextTerm2);

    }

    return sub(mul(cnt, term1), mul(vcnt, term2));
  };

  //gamma(complex(x,y))

  var p = parametric(
    (x, y) => [
      x,
      y,
      go(x, y)
    ], [-5, 5, 201], [-5, 5, 150], {
      complexFunction: opt,
      colormap: 'complexArgument'
    }
  );

  var zcMin, zcMax;
  if (opt === 'abs') {
    zcMin = 0;
    zcMax = 8;
  } else {
    zcMin = -5;
    zcMax = 5;
  }

  var config = {
    type: 'threejs',
    zMin: zcMin,
    zMax: zcMax,
    viewpoint: [0.9, -1, 1]
  };

  evaluate(id, [p], config);

}

parent.update(id);