'use strict';const _0x3c727a=_0x3845;(function(_0x25de86,_0xd7a1a3){const _0x2c95e6=_0x3845,_0x1730f3=_0x25de86();while(!![]){try{const _0x4823aa=parseInt(_0x2c95e6(0x8c))/0x1+-parseInt(_0x2c95e6(0xa3))/0x2*(parseInt(_0x2c95e6(0x9c))/0x3)+parseInt(_0x2c95e6(0x8b))/0x4+-parseInt(_0x2c95e6(0xad))/0x5*(parseInt(_0x2c95e6(0x90))/0x6)+-parseInt(_0x2c95e6(0x9f))/0x7*(-parseInt(_0x2c95e6(0x89))/0x8)+parseInt(_0x2c95e6(0x99))/0x9*(parseInt(_0x2c95e6(0x93))/0xa)+-parseInt(_0x2c95e6(0xa0))/0xb;if(_0x4823aa===_0xd7a1a3)break;else _0x1730f3['push'](_0x1730f3['shift']());}catch(_0x1d689e){_0x1730f3['push'](_0x1730f3['shift']());}}}(_0x159f,0xbfefa));var __importDefault=this&&this[_0x3c727a(0x9a)]||function(_0x2d401a){const _0x2bfe8a=_0x3c727a;return _0x2d401a&&_0x2d401a[_0x2bfe8a(0xa8)]?_0x2d401a:{'default':_0x2d401a};};Object['defineProperty'](exports,_0x3c727a(0xa8),{'value':!![]});function _0x3845(_0x33db76,_0x1c2758){const _0x159fce=_0x159f();return _0x3845=function(_0x384503,_0x6aea5d){_0x384503=_0x384503-0x89;let _0x5aaefa=_0x159fce[_0x384503];return _0x5aaefa;},_0x3845(_0x33db76,_0x1c2758);}function _0x159f(){const _0x2f2f2e=['geeks','transaction','__esModule','User\x20already\x20exists','commit','length','email','301415KFaLYP','users.*','user_id','8488040vcMDhx','Unexpected\x20error\x20while\x20creating\x20new\x20user','5445468LmWMEZ','604935Ljcqlo','bcrypt','insert','Unexpected\x20error\x20while\x20updating\x20user','30MbWMCr','join','send','30dfqVpD','users','update','status','rollback','where','599769VhwVZW','__importDefault','body','485223naGLIg','users.id','log','7wAsaQG','11082038ylDMML','User\x20doesn\x27t\x20exists','default','14gbhFiV','json','show'];_0x159f=function(){return _0x2f2f2e;};return _0x159f();}const connection_1=__importDefault(require('../database/connection')),bcrypt_1=__importDefault(require(_0x3c727a(0x8d)));class UserController{async['store'](_0x26f7b1,_0x51f1e5){const _0x4e9c20=_0x3c727a,{name:_0x546a5a,email:_0x219b42,password:_0x39f2eb}=_0x26f7b1[_0x4e9c20(0x9b)],_0x157e8a=await connection_1[_0x4e9c20(0xa2)](_0x4e9c20(0x94))[_0x4e9c20(0x98)](_0x4e9c20(0xac),_0x219b42);if(_0x157e8a['length']!==0x0)return _0x51f1e5[_0x4e9c20(0x96)](0x190)['json']({'error':_0x4e9c20(0xa9)});const _0x47d548=await bcrypt_1[_0x4e9c20(0xa2)]['hash'](_0x39f2eb,0x8),_0x222405=await connection_1[_0x4e9c20(0xa2)][_0x4e9c20(0xa7)]();try{return await _0x222405(_0x4e9c20(0x94))[_0x4e9c20(0x8e)]({'name':_0x546a5a,'email':_0x219b42,'password_hash':_0x47d548}),await _0x222405[_0x4e9c20(0xaa)](),_0x51f1e5['status'](0xc9)[_0x4e9c20(0x92)]();}catch(_0x57eb24){return console[_0x4e9c20(0x9e)](_0x57eb24),await _0x222405[_0x4e9c20(0x97)](),_0x51f1e5['status'](0x190)['json']({'error':_0x4e9c20(0x8a)});}}async['update'](_0x56b8f7,_0x8ab35){const _0x535954=_0x3c727a,{name:_0x375517,email:_0x296e8c,whatsapp:_0x290fbc,avatar:_0x3bd72c,is_geek:_0x317d92}=_0x56b8f7[_0x535954(0x9b)],_0x4420ee=_0x56b8f7['id'],_0x3cc2b1=await connection_1[_0x535954(0xa2)](_0x535954(0x94))['where']('id',_0x4420ee);if(_0x3cc2b1[_0x535954(0xab)]===0x0)return _0x8ab35[_0x535954(0x96)](0x190)[_0x535954(0xa4)]({'error':_0x535954(0xa1)});const _0x2bf221=await connection_1[_0x535954(0xa2)][_0x535954(0xa7)]();try{return!_0x375517&&!_0x296e8c&&_0x290fbc[_0x535954(0xab)]>0x0&&!_0x3bd72c?await _0x2bf221(_0x535954(0x94))[_0x535954(0x98)]('id',_0x4420ee)[_0x535954(0x95)]({'whatsapp':_0x290fbc}):await _0x2bf221(_0x535954(0x94))[_0x535954(0x98)]('id',_0x4420ee)[_0x535954(0x95)]({'name':_0x375517,'email':_0x296e8c,'whatsapp':_0x290fbc,'avatar':_0x3bd72c,'is_geek':_0x317d92}),await _0x2bf221[_0x535954(0xaa)](),_0x8ab35['status'](0xc8)[_0x535954(0x92)]();}catch(_0x272d58){return console[_0x535954(0x9e)](_0x272d58),await _0x2bf221[_0x535954(0x97)](),_0x8ab35['status'](0x190)[_0x535954(0xa4)]({'error':_0x535954(0x8f)});}}async[_0x3c727a(0xa5)](_0x4ba80c,_0x440263){const _0x10860b=_0x3c727a,_0x32d2b1=_0x4ba80c['id'];let _0x58c332=await connection_1['default'](_0x10860b(0x94))['where'](_0x10860b(0x9d),_0x32d2b1)['select']([_0x10860b(0xae)]);if(_0x58c332[_0x10860b(0xab)]===0x0)return _0x440263[_0x10860b(0x96)](0x194)[_0x10860b(0xa4)]({'error':_0x10860b(0xa1)});const _0x1710b4=await connection_1[_0x10860b(0xa2)](_0x10860b(0xa6))[_0x10860b(0x98)](_0x10860b(0xaf),_0x32d2b1);let _0x448db2=_0x58c332[0x0];return _0x1710b4[_0x10860b(0xab)]>0x0&&(_0x58c332=await connection_1[_0x10860b(0xa2)](_0x10860b(0x94))[_0x10860b(0x98)](_0x10860b(0x9d),_0x32d2b1)[_0x10860b(0x91)](_0x10860b(0xa6),'geeks.user_id',_0x10860b(0x9d)),_0x448db2=_0x58c332[0x0]),_0x440263[_0x10860b(0xa4)](_0x448db2);}}exports[_0x3c727a(0xa2)]=UserController;